import {AfterViewInit, Directive, DoCheck, ElementRef, HostListener, Input, KeyValueDiffer, KeyValueDiffers, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CurrencyMaskConfig, CurrencyMaskInputMode} from "./sr-mask-currency.config";
import {InputHandler} from "./input.handler";


@Directive({
  selector: "[srMaskCurrency]",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SrMaskCurrencyDirective,
    multi: true
  }]
})
export class SrMaskCurrencyDirective implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit {

  @Input("srMaskCurrency")
  options: Partial<CurrencyMaskConfig> = {};

  public inputHandler: InputHandler;
  public keyValueDiffer: KeyValueDiffer<any, any>;

  public optionsTemplate: CurrencyMaskConfig = {
    align: "right",
    allowNegative: false,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ".",
    nullable: false,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };

  constructor(private elementRef: ElementRef, private keyValueDiffers: KeyValueDiffers) {

    this.keyValueDiffer = keyValueDiffers.find({}).create();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.textAlign = this.options && this.options.align ? this.options.align : this.optionsTemplate.align;
  }

  ngDoCheck() {
    if (this.keyValueDiffer.diff(this.options)) {
      this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
      this.inputHandler.updateOptions((<any>Object).assign({}, this.optionsTemplate, this.options));
    }
  }

  ngOnInit() {
    this.inputHandler = new InputHandler(this.elementRef.nativeElement, (<any>Object).assign({}, this.optionsTemplate, this.options));
  }

  @HostListener("blur", ["$event"])
  handleBlur(event: any) {
    this.inputHandler.getOnModelTouched().apply(event);
  }

  @HostListener("cut", ["$event"])
  handleCut(event: any) {
    if (!this.isChromeAndroid()) {
      // tslint:disable-next-line:no-unused-expression
      !this.isReadOnly() && this.inputHandler.handleCut(event);
    }
  }

  @HostListener("input", ["$event"])
  handleInput(event: any) {
    if (this.isChromeAndroid()) {
      // tslint:disable-next-line:no-unused-expression
      !this.isReadOnly() && this.inputHandler.handleInput(event);
    }
  }

  @HostListener("keydown", ["$event"])
  handleKeydown(event: any) {
    if (!this.isChromeAndroid()) {
      // tslint:disable-next-line:no-unused-expression
      !this.isReadOnly() && this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener("keypress", ["$event"])
  handleKeypress(event: any) {
    if (!this.isChromeAndroid()) {
      // tslint:disable-next-line:no-unused-expression
      !this.isReadOnly() && this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener("paste", ["$event"])
  handlePaste(event: any) {
    if (!this.isChromeAndroid()) {
      // tslint:disable-next-line:no-unused-expression
      !this.isReadOnly() && this.inputHandler.handlePaste(event);
    }
  }

  @HostListener("drop", ["$event"])
  handleDrop(event: any) {
    if (!this.isChromeAndroid()) {
      event.preventDefault();
    }
  }

  isChromeAndroid(): boolean {
    return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
  }

  isReadOnly(): boolean {
    return this.elementRef.nativeElement.hasAttribute("readonly");
  }

  registerOnChange(callbackFunction: Function): void {
    this.inputHandler.setOnModelChange(callbackFunction);
  }

  registerOnTouched(callbackFunction: Function): void {
    this.inputHandler.setOnModelTouched(callbackFunction);
  }

  setDisabledState(value: boolean): void {
    this.elementRef.nativeElement.disabled = value;
  }

  writeValue(value: number): void {
    this.inputHandler.setValue(value);
  }
}
