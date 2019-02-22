import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {NgControl} from "@angular/forms";
import moment from "moment-es6";
import {DeviceDetectorService} from "ngx-device-detector";
import {MatDatepicker} from "@angular/material";
import {isNotNullOrUndefined, isNullOrUndefined} from "../../sr-utils";

interface Config {
  mask: string;
  datePicker: MatDatepicker<any>;
}

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
  private isFocused: boolean = false;

  constructor(private el: ElementRef, private form: NgControl, private deviceService: DeviceDetectorService) {
  }

  @Input("srDateMask1")
  set config(value: Config | MatDatepicker<any>) {
    this._config = value;
    console.log("setou config");
  }

  ngOnInit() {
    if (isNotNullOrUndefined(this._config)) {
      if (this._config instanceof MatDatepicker) {
        this.datePicker = this._config as MatDatepicker<any>;
      } else {
        if (isNotNullOrUndefined(this._config.mask)) {
          this.mask = this._config.mask;
        } else {
          this.mask = "DD/MM/YYYY";
        }
        this.datePicker = this._config.datePicker;
      }
    } else {
      this.mask = "DD/MM/YYYY";
    }
    console.log("chamoungOninit");
  }

  ngAfterViewInit(): void {
    if (isNotNullOrUndefined(this.datePicker)) {
      //controle de evento quando se abrir o calendario
      this.datePicker.openedStream.subscribe(() => {
        //so iremos adicionar o focus quando for o tipo desktop
        if (!this.isTouch()) {
          setTimeout(() => this.el.nativeElement.focus(), 100);
        }
        this.alreadyOpened = true;
        console.log("notificou a abertura do calendario");
      });
    }

    console.log("configurou o ngAfterViewInit");
  }

  @HostListener("input", ["$event"])
  onInputChange($event) {
    const result = this.aplicarMascara(this.el.nativeElement.value);
    if (this.isValidDate(result, this.mask)) {
      this.form.control.setValue(this.toDate(result, this.mask));
    } else {
      this.form.control.setValue(null);
    }
    this.el.nativeElement.value = result;
  }

  @HostListener("blur", ["$event"])
  onBlur($event: any) {
    const result = this.aplicarMascara(this.el.nativeElement.value);
    //verificando se é necessário disparar um evento
    if (this.isValidDate(result, this.mask)) {
      if (isNullOrUndefined(this.form.control.value) || !this.toMoment(result, this.mask).isSame(moment(this.form.control.value))) {
        this.form.control.setValue(this.toDate(result, this.mask));
      }
    } else {
      this.form.control.setValue(null);
    }
    this.resetCalendar();
    console.log("chamou o blur");
  }

  @HostListener("focus", ["$event"])
  onFocus($event) {
    this.openCalendar();
  }

  openCalendar() {
    console.log(this.alreadyOpened);
    console.log(this.datePicker);
    if (isNotNullOrUndefined(this.datePicker)) {
      console.log(this.alreadyOpened);

      if (!this.alreadyOpened) {
        this.datePicker.touchUi = this.isTouch();
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

  private isValidDate(value: string, pattern: string): boolean {
    if (value.length <= 8) {
      return false;
    }
    return moment(moment(value, pattern).format(pattern), pattern, true).isValid();
  }

  private toDate(value: string, pattern: string): Date {
    return this.toMoment(value, pattern).toDate();
  }

  private toMoment(value: string, pattern: string): moment.Moment {
    return moment(value, pattern);
  }

  private isTouch(): boolean {
    return this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  private resetCalendar() {
    if (isNotNullOrUndefined(this.datePicker) && this.alreadyOpened && this.isFocused) {
      this.alreadyOpened = false;
      this.isFocused = false;
      //this.datePicker.close();
    }
  }
}
