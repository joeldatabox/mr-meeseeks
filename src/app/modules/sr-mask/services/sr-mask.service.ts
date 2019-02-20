import {Injectable, ViewContainerRef} from "@angular/core";
import {isEmpty, isNullOrUndefined} from "../../sr-utils";
import {createTextMaskInputElement} from "text-mask-core/dist/textMaskCore";
import emailMask from "text-mask-addons/dist/emailMask";
import {createNumberMask} from "text-mask-addons/dist/textMaskAddons";
import {NumberOptions} from "./number-options.interface";

@Injectable({
  providedIn: "root"
})
export class SrMaskService {
  email() {
    return emailMask();
  }

  fone() {
    return {mask: ["(", /[1-9]/, /[1-9]/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]};
  }

  cell() {
    return {mask: ["(", /[1-9]/, /[1-9]/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]};
  }

  cpf() {
    return {mask: [/[0-9]/, /[0-9]/, /[0-9]/, ".", /[0-9]/, /[0-9]/, /[0-9]/, ".", /[0-9]/, /[0-9]/, /[0-9]/, "-", /[0-9]/, /[0-9]/]};
  }

  integerNumberMask() {
    return this.customNumber({
      prefix: "",
      suffix: "",
      thousandsSeparatorSymbol: ".",
      decimalLimit: 0,
      allowLeadingZeroes: true
    });
  }

  decimalNumberMask() {
    return this.customNumber({
      prefix: "",
      suffix: "",
      thousandsSeparatorSymbol: ".",
      decimalLimit: 2,
      allowLeadingZeroes: true,
      decimalSymbol: ",",
      requireDecimal: true
    });
  }

  customNumber(options?: NumberOptions) {
    if (isNullOrUndefined(options)) {
      options = {};
    }
    this.configOption(options, "prefix", "");
    this.configOption(options, "suffix", "");
    this.configOption(options, "includeThousandsSeparator", true);
    this.configOption(options, "thousandsSeparatorSymbol", ".");
    this.configOption(options, "allowDecimal", false);
    this.configOption(options, "decimalSymbol", ",");
    this.configOption(options, "decimalLimit", 2);
    this.configOption(options, "integerLimit", null);
    this.configOption(options, "requireDecimal", false);
    this.configOption(options, "allowNegative", false);
    this.configOption(options, "allowLeadingZeroes", true);
    return {
      mask: createNumberMask(options)
    };
  }

  /**
   * Verifica se uma propriedade já foi definida em um objeto,
   * caso não tenha sido definida, a mesma tem um valor padrão definido
   */
  private configOption(obj: any, propertyName: string, defaultValue?: any): void {
    if (isNullOrUndefined(obj[propertyName])) {
      obj[propertyName] = defaultValue;
    }
  }

  date(mask?: Array<any>/*, pipe?: string*/) {
    mask = isEmpty(mask) ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : mask;
    //pipe = isEmpty(pipe) ? createAutoCorrectedDatePipe("dd/MM/yyyy") : createAutoCorrectedDatePipe(pipe);
    return {
      mask: mask,
      placeholderChar: " ",
      keepCharPositions: false,
      /*pipe: pipe*/
    };
  }


  /**
   * Função usada como paliativa para adicionar mascaras em campos de dados;
   *
   * A mesma se faz necessária quando um campo já tem um CustomValueAcessor
   *
   * Exemplo de utilização
   *
   * mask = [ /[1-9]/, /\d/, /\d/]; //mascara desejada
   * maskedInputController;

   * @ViewChild("input", { read: ViewContainerRef }) public input; //instancia do campo
   *
   * ngAfterViewInit(): void {
   *    setTimeout(() => {
   *     this.maskedInputController = addCustomMaskInput({
   *       inputElement: this.input.element.nativeElement,
   *       mask: this.mask
   *    });
   *  });
   * }
   *
   * ngOnDestroy() {
   *   this.maskedInputController.destroy();
   * }
   */
  addCustomMaskInput(textMaskConfig) {
    const {inputElement} = textMaskConfig;
    const textMaskInputElement = createTextMaskInputElement(textMaskConfig);
    const inputHandler = ({target: {value}}) => textMaskInputElement.update(value);

    inputElement.addEventListener("input", inputHandler);

    textMaskInputElement.update(inputElement.value);

    return {
      textMaskInputElement,

      destroy() {
        inputElement.removeEventListener("input", inputHandler);
      }
    };
  }

  /**
   * Função usada como paliativa para adicionar mascaras em campos de dados;
   *
   * A mesma se faz necessária quando um campo já tem um CustomValueAcessor
   *
   * Exemplo de utilização
   *
   * maskedInputController;

   * @ViewChild("input", { read: ViewContainerRef }) public input; //instancia do campo
   *
   * ngAfterViewInit(): void {
   *    setTimeout(() => {
   *     this.maskedInputController = addCustomMaskInput(this.input);
   *  });
   * }
   *
   * ngOnDestroy() {
   *   this.maskedInputController.destroy();
   * }
   */
  addCustomMaskDateInput(ref: ViewContainerRef, mask?: Array<any>): any {

    const custom = this.date(mask);
    custom["inputElement"] = ref.element.nativeElement;
    return this.addCustomMaskInput(custom);
  }

}
