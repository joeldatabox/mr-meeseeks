import {isPlatformBrowser} from "@angular/common";
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  ViewChild
} from "@angular/core";
import {animate, AnimationBuilder, style} from "@angular/animations";
import {Orientation, SrCarousel} from "../../model/sr-carousel";
import {ThemePalette} from "@angular/material";
import {BehaviorSubject, interval, Observable, Subject} from "rxjs";
import {filter, takeUntil} from "rxjs/operators";
import {ListKeyManager} from "@angular/cdk/a11y";
import {SrCarouselSlideComponent} from "../sr-carousel-slide/sr-carousel-slide.component";

enum Direction {
  Left,
  Right,
  Index
}

@Component({
  selector: "sr-carousel",
  templateUrl: "./sr-carousel.component.html",
  styleUrls: ["./sr-carousel.component.scss"]
})
export class SrCarouselComponent implements AfterContentInit, AfterViewInit, SrCarousel, OnDestroy {
  private _autoplay: Subject<boolean> = new Subject<boolean>();
  private _autoplayState: boolean = true;
  private _interval: Subject<number> = new BehaviorSubject<number>(5000);
  private _loop: boolean = true;
  private _loopSubject: Subject<boolean> = new Subject<boolean>();
  private _maxWidth: string = "auto";
  private _maxWidthSubject: Subject<never> = new Subject<never>();
  private _slides: Subject<number> = new BehaviorSubject<number>(null);
  private _orientation: Orientation = "ltr";
  private _orientationSubject: Subject<Orientation> = new Subject<Orientation>();
  private _timer: Observable<number>;
  private _timerStop: Subject<never> = new Subject<never>();
  private _destroy: Subject<never> = new Subject<never>();
  private _playing: boolean = false;


  @ContentChildren(SrCarouselSlideComponent)
  slidesList: QueryList<SrCarouselSlideComponent>;

  @ViewChild("carouselContainer", {static:true})
  private carouselContainer: ElementRef<HTMLDivElement>;

  @ViewChild("carouselList", {static:true})
  private _carouselList: ElementRef<HTMLElement>;
  listKeyManager: ListKeyManager<SrCarouselSlideComponent>;

  @Input()
  color: ThemePalette = "accent";
  @Input()
  hideArrows: boolean = false;
  @Input()
  hideIndicators: boolean = false;
  @Input()
  autoHideArrows: boolean = true;
  @Input()
  autoHideIndicators: boolean = true;
  @Input()
  highlightButtons: boolean = true;

  @Input()
  proportion: number = 25;

  @Input()
  set slides(value: number) {
    this._slides.next(value);
  }

  @Input()
  timings: string = "250ms ease-in";
  @Input()
  useKeyboard: boolean = false;
  @Input()
  useMouseWheel: boolean = false;

  constructor(private animationBuilder: AnimationBuilder, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId) {
  }

  @Input()
  set autoplay(value: boolean) {
    this._autoplay.next(value);
    this._autoplayState = value;
  }

  @Input()
  set interval(value: number) {
    this._interval.next(value);
  }

  get loop(): boolean {
    return this._loop;
  }

  @Input()
  set loop(value: boolean) {
    this._loopSubject.next(value);
    this._loop = value;
  }

  get maxWidth(): string {
    return this._maxWidth;
  }

  @Input()
  set maxWidth(value: string) {
    this._maxWidth = value;
    this._maxWidthSubject.next();
  }

  get orientation(): Orientation {
    return this._orientation;
  }

  @Input()
  set orientation(value: Orientation) {
    this._orientation = value;
    this._orientationSubject.next(value);
  }

  public get currentIndex(): number {
    if (this.listKeyManager) {
      return this.listKeyManager.activeItemIndex;
    }

    return 0;
  }

  public get currentSlide(): SrCarouselSlideComponent {
    if (this.listKeyManager) {
      return this.listKeyManager.activeItem;
    }

    return null;
  }

  private getTranslation(offset: number): string {
    return `translateX(${offset}px)`;
  }

  ngAfterContentInit(): void {
    this.listKeyManager = new ListKeyManager(this.slidesList)
      .withVerticalOrientation(false)
      .withHorizontalOrientation(this._orientation)
      .withWrap(this._loop);

    this.listKeyManager.updateActiveItem(0);
    this.listKeyManager.change
      .pipe(
        takeUntil(this._destroy)
      ).subscribe(() => this.playAnimation());
  }

  ngAfterViewInit(): void {
    this._autoplay
      .pipe(
        takeUntil(this._destroy)
      ).subscribe(value => {
      this.stopTimer();
      this.startTimer(value);
    });

    this._interval
      .pipe(
        takeUntil(this._destroy)
      ).subscribe(value => {
      this.stopTimer();
      this.resetTimer(value);
      this.startTimer(this._autoplayState);
    });

    this._maxWidthSubject
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.slideTo(0));

    this._loopSubject
      .pipe(
        takeUntil(this._destroy)
      ).subscribe(value => this.listKeyManager.withWrap(value));

    this._orientationSubject
      .pipe(
        takeUntil(this._destroy)
      ).subscribe(value => this.listKeyManager.withHorizontalOrientation(value));

    this._slides
      .pipe(
        takeUntil(this._destroy),
        filter(value => value && value < this.slidesList.length)
      ).subscribe(value => this.resetSlides(value));
  }

  private getOffset(): number {
    const offset = this.listKeyManager.activeItemIndex * this.getWidth();
    const sign = this.orientation === "rtl" ? 1 : -1;
    return sign * offset;
  }

  @HostListener("keyup", ["$event"])
  public onKeyUp(event: KeyboardEvent): void {
    if (this.useKeyboard && !this._playing) {
      this.listKeyManager.onKeydown(event);
    }
  }

  @HostListener("mouseenter")
  public onMouseEnter(): void {
    this.stopTimer();
  }

  @HostListener("mouseleave")
  public onMouseLeave(): void {
    this.startTimer(this._autoplayState);
  }

  @HostListener("mousewheel", ["$event"])
  public onMouseWheel(event): void {
    if (this.useMouseWheel) {
      event.preventDefault(); // prevent window to scroll
      const delta = Math.sign(event.wheelDelta);

      if (delta < 0) {
        this.next();
      } else if (delta > 0) {
        this.previous();
      }
    }
  }

  @HostListener("window:resize", ["$event"])
  public onResize(event: Event): void {
    // Reset carousel when window is resized
    // in order to avoid major glitches.
    this.slideTo(0);
  }

  public onPan(event: any, slideElem: HTMLElement): void {
    let deltaX = event.deltaX;
    if (this.isOutOfBounds()) {
      deltaX *= 0.2; // decelerate movement;
    }

    this.renderer.setStyle(slideElem, "cursor", "grabbing");
    this.renderer.setStyle(
      this._carouselList.nativeElement,
      "transform",
      this.getTranslation(this.getOffset() + deltaX)
    );
  }

  public onPanEnd(event: any, slideElem: HTMLElement): void {
    this.renderer.removeStyle(slideElem, "cursor");

    if (!this.isOutOfBounds() && Math.abs(event.deltaX) > this.getWidth() * 0.25) {
      if (event.deltaX <= 0) {
        this.next();
        return;
      }
      this.previous();
      return;
    }
    this.playAnimation(); // slide back, don't change current index
  }

  private isOutOfBounds(): boolean {
    const sign = this.orientation === "rtl" ? -1 : 1;
    const left = sign * (this._carouselList.nativeElement.getBoundingClientRect().left -
      this._carouselList.nativeElement.offsetParent.getBoundingClientRect().left);
    const lastIndex = this.slidesList.length - 1;
    const width = -this.getWidth() * lastIndex;
    return ((this.listKeyManager.activeItemIndex === 0 && left >= 0) ||
      (this.listKeyManager.activeItemIndex === lastIndex && left <= width));
  }

  private getWidth(): number {
    return this.carouselContainer.nativeElement.clientWidth;
  }

  private goto(direction: Direction, index?: number): void {
    if (!this._playing) {
      const rtl = this.orientation === "rtl";

      switch (direction) {
        case Direction.Left:
          return rtl ? this.listKeyManager.setNextItemActive() : this.listKeyManager.setPreviousItemActive();
        case Direction.Right:
          return rtl ? this.listKeyManager.setPreviousItemActive() : this.listKeyManager.setNextItemActive();
        case Direction.Index:
          return this.listKeyManager.setActiveItem(index);
      }
    }
  }

  private playAnimation(): void {
    const translation = this.getTranslation(this.getOffset());
    const factory = this.animationBuilder.build(
      animate(this.timings, style({transform: translation}))
    );
    const animation = factory.create(this._carouselList.nativeElement);

    animation.onStart(() => (this._playing = true));
    animation.onDone(() => {
      this._playing = false;
      this.renderer.setStyle(
        this._carouselList.nativeElement,
        "transform",
        translation
      );
      animation.destroy();
    });
    animation.play();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  public next(): void {
    this.goto(Direction.Right);
  }

  public previous(): void {
    this.goto(Direction.Left);
  }

  public slideTo(index: number): void {
    this.goto(Direction.Index, index);
  }

  private isVisible(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const elem = this.carouselContainer.nativeElement;
    const docViewTop = window.pageYOffset;
    const docViewBottom = docViewTop + window.innerHeight;
    const elemOffset = elem.getBoundingClientRect();
    const elemTop = docViewTop + elemOffset.top;
    const elemBottom = elemTop + elemOffset.height;

    return elemBottom <= docViewBottom || elemTop >= docViewTop;
  }

  private resetSlides(slides: number): void {
    this.slidesList.reset(this.slidesList.toArray().slice(0, slides));
  }

  private resetTimer(value: number): void {
    this._timer = interval(value);
  }

  private startTimer(autoplay: boolean): void {
    if (!autoplay) {
      return;
    }

    this._timer
      .pipe(
        takeUntil(this._timerStop),
        takeUntil(this._destroy),
        filter(() => this.isVisible())
      )
      .subscribe(() => {
        this.listKeyManager.withWrap(true).setNextItemActive();
        this.listKeyManager.withWrap(this.loop);
      });
  }

  private stopTimer(): void {
    this._timerStop.next();
  }

}
