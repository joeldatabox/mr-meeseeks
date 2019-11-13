import {Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";


@Directive({
  selector: "[srMaskCurrency]",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SrMaskCurrencyDirective,
    multi: true
  }]
})
export class SrMaskCurrencyDirective implements ControlValueAccessor, OnInit {
  onTouched: any;
  onChange: any;

  separadorDecimal: string;
  separadorMilhar: string;
  prefixo: string;
  sufixo: string;

  @Input("srMaskCurrency") config: { decimal: string, milhar: string, prefix: string, sufix: string };

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (isNullOrUndefined(this.config)) {
      this.separadorDecimal = ",";
      this.separadorMilhar = ".";
      this.prefixo = "";
      this.sufixo = "";
    } else {
      this.separadorDecimal = isNullOrUndefined(this.config.decimal) ? "," : this.config.decimal;
      this.separadorMilhar = isNullOrUndefined(this.config.milhar) ? "." : this.config.milhar;
      this.prefixo = isNullOrUndefined(this.config.prefix) ? "" : this.config.prefix;
      this.sufixo = isNullOrUndefined(this.config.sufix) ? "" : this.config.sufix;
    }
  }

  writeValue(value: any): void {
    if (value != null && value !== undefined && value !== "") {
      if (!isNaN(value)) {
        let valueStr = String(value);
        if (!valueStr.includes(".")) {
          valueStr = valueStr + ".00";
        }
        value = valueStr;
      }
      this.el.nativeElement.value = this.aplicarMascara(String(value));
    } else {
      this.el.nativeElement.value = "";
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener("blur", ["$event"])
  onBlur($event: any) {
    this.onInputChange($event);
  }

  @HostListener("input", ["$event"])
  onInputChange($event) {
    const valor: string = this.aplicarMascara($event.target.value);
    const currentMilhar = valor.split(".").length - 1;
    if (valor === "") {
      this.onChange("");
      $event.target.value = "";
      return;
    }

    if (this.separadorDecimal === ",") {
      this.onChange(Number(valor.replace(/\./g, "").replace(",", ".")));
    } else {
      this.onChange(valor.replace(/\,/g, ""));
    }

    $event.target.value = valor;
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valorConverter
   * @return string
   */
  aplicarMascara(valorConverter: string): string {
    const valorNum = parseInt(valorConverter.replace(/\D/g, ""), 10);
    let valorMask = "";
    let valor: string;

    if (isNaN(valorNum)) {
      return "";
    }

    valor = valorNum.toString();
    switch (valor.length) {
      case 1:
        valorMask = "0" + this.separadorDecimal +
          "0" + valor;
        break;
      case 2:
        valorMask = "0" + this.separadorDecimal + valor;
        break;
      case 3:
        valorMask = valor.substr(0, 1) + this.separadorDecimal +
          valor.substr(1, 2);
        break;
      default:
        break;
    }

    if (valorMask === "") {
      let sepMilhar = 0;
      for (let i = (valor.length - 3); i >= 0; i--) {
        if (sepMilhar === 3) {
          valorMask = this.separadorMilhar + valorMask;
          sepMilhar = 0;
        }
        valorMask = valor.charAt(i) + valorMask;
        sepMilhar++;
      }
      valorMask = valorMask + this.separadorDecimal +
        valor.substr(valor.length - 2, 2);
    }

    if (this.prefixo !== "") {
      valorMask = this.prefixo + " " + valorMask;
    }
    if (this.sufixo !== "") {
      valorMask = valorMask + this.prefixo;
    }

    return valorMask;
  }

}
