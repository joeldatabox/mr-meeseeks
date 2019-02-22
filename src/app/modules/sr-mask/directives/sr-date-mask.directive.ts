import {Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {NgControl} from "@angular/forms";
import {isNullOrUndefined} from "../../sr-utils";
import moment from "moment-es6";


@Directive({
  selector: "[srDateMask]"
})
export class SrDateMaskDirective implements OnInit {
  mask: string;

  @Input("srDateMask") config: { mask: string };

  constructor(private el: ElementRef, private form: NgControl) {
  }

  ngOnInit() {
    this.mask = this.config.mask || "DD/MM/YYYY";
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
}
