import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from "@angular/core";
import {NgControl} from "@angular/forms";
import moment from "moment-es6";
import {DeviceDetectorService} from "ngx-device-detector";
import { MatDatepicker } from "@angular/material/datepicker";
import {delay} from "rxjs/operators";
import {isEmpty, isNotNullOrUndefined, isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";

interface Config {
  mask: string;
  datePicker: MatDatepicker<any>;
}

const DEFAULT_MASK = "DD/MM/YYYY";

@Directive({
  selector: "[srDateMask]"
})
export class SrDateMaskDirective implements OnInit, AfterViewInit {
  private mask: string;
  private datePicker: MatDatepicker<any>;
  private _config: Config | MatDatepicker<any>;

  private alreadyOpened: boolean = false;
  //gabiarra para controlle do evento onBlur
  //o mesmo é chamado 2 vezes quando ganha e perde o foco
  private countOnBlur: number = 0;

  constructor(private el: ElementRef, private form: NgControl, private deviceService: DeviceDetectorService, private renderer: Renderer2) {
  }

  @Input("srDateMask")
  set config(value: Config | MatDatepicker<any>) {
    this._config = value;
  }

  ngOnInit() {
    if (isNotNullOrUndefined(this._config)) {
      if (this._config instanceof MatDatepicker) {
        this.datePicker = this._config as MatDatepicker<any>;
        this.mask = DEFAULT_MASK;
      } else {
        if (isNotNullOrUndefined(this._config.mask)) {
          this.mask = this._config.mask;
        } else {
          this.mask = DEFAULT_MASK;
        }
        this.datePicker = this._config.datePicker;
      }
    } else {
      this.mask = DEFAULT_MASK;
    }

  }

  ngAfterViewInit(): void {
    if (isNotNullOrUndefined(this.datePicker)) {
      //controle de evento quando se abrir o calendario
      this.datePicker
        .openedStream
        .pipe(delay(100))
        .subscribe(() => {
          //so iremos adicionar o focus quando for o tipo desktop
          if (!this.isTouch()) {
            this.el.nativeElement.focus();
          }
          this.alreadyOpened = true;
        });

      this.datePicker
        .closedStream
        .pipe(delay(100))
        .subscribe(() => {
          this.alreadyOpened = false;
          if (this.isTouch()) {
            this.el.nativeElement.blur();
          }
        });

      if (this.isTouch()) {
        this.renderer.setAttribute(this.el.nativeElement, "readonly", "");
      }

      this.datePicker.touchUi = this.isTouch();
    }
  }

  @HostListener("input", ["$event"])
  onInputChange($event) {
    const result = this.aplicarMascara(this.el.nativeElement.value);
    if (this.isValidDate(result)) {
      this.form.control.setValue(this.toDate(result));
    } else {
      this.form.control.setValue(null);
    }
    this.el.nativeElement.value = result;
  }

  @HostListener("document:keydown", ["$event"])
  onKeyPress() {
    this.resetCalendar();
  }

  @HostListener("focus", ["$event"])
  onFocus($event) {
    this.openCalendar();
  }

  @HostListener("blur", ["$event"])
  onBlur($event: any) {
    const result = this.aplicarMascara(this.el.nativeElement.value);
    //verificando se é necessário disparar um evento
    if (!((isEmpty(result) && isEmpty(this.form.control.value)) || (isEmpty(result) && isNullOrUndefined(this.form.control.value)))) {
      if (this.isValidDate(result)) {
        if (isNullOrUndefined(this.form.control.value) || !this.toMoment(result).isSame(moment(this.form.control.value))) {
          this.form.control.setValue(this.toDate(result));
        }
      } else {
        this.form.control.setValue(null);
      }
    }
  }

  openCalendar() {
    if (isNotNullOrUndefined(this.datePicker)) {
      if (!this.alreadyOpened) {
        this.datePicker.open();
      }
    }
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valorConverter
   * @return string
   */
  private aplicarMascara(valorConverter: string): string {
    if (isEmpty(valorConverter)) {
      return "";
    }
    valorConverter = valorConverter.replace(/\D/g, "");

    const length = valorConverter.length;

    if (length > 2 || length === 3) {
      valorConverter = valorConverter.substr(0, 2) + "/" + valorConverter.substr(2, valorConverter.length);
    }
    if (length > 4) {
      valorConverter = valorConverter.substr(0, 5) + "/" + valorConverter.substr(5, valorConverter.length);
    }
    return valorConverter;
  }

  private isValidDate(value: string): boolean {
    if (value.length <= 8) {
      return false;
    }
    return moment(moment(value, this.mask).format(this.mask), this.mask, true).isValid();
  }

  private toDate(value: string): Date {
    return this.toMoment(value).toDate();
  }

  private toMoment(value: string): moment.Moment {
    return moment(value, this.mask);
  }

  private isTouch(): boolean {
    return this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  private resetCalendar() {
    this.countOnBlur++;
    if (isNotNullOrUndefined(this.datePicker)) {
      this.alreadyOpened = false;
      this.datePicker.close();
      this.countOnBlur = 0;
    }
  }
}
