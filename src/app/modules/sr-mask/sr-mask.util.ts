import {createTextMaskInputElement} from "text-mask-core/dist/textMaskCore";
import emailMask from "text-mask-addons/dist/emailMask";
import {createAutoCorrectedDatePipe} from "text-mask-addons/dist/textMaskAddons";
import {isEmpty} from "../sr-utils/commons/sr-commons.model";
import {ViewContainerRef} from "@angular/core";


const SrMaskUtil = {
  /**
   * @deprecated
   * please using
   * @link SrMaskService#email()
   */
  email: () => emailMask,
  /**
   * @deprecated
   * please using
   * @link SrMaskService#fone()
   */
  fone: () => {
    return {mask: ["(", /[1-9]/, /[1-9]/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]};
  },
  /**
   * @deprecated
   * please using
   * @link SrMaskService#cell()
   */
  cell: () => {
    return {mask: ["(", /[1-9]/, /[1-9]/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]};
  },
  /**
   * @deprecated
   * please using
   * @link SrMaskService#cpf()
   */
  cpf: () => {
    return {
      mask: [/[0-9]/, /[0-9]/, /[0-9]/, ".", /[0-9]/, /[0-9]/, /[0-9]/, ".", /[0-9]/, /[0-9]/, /[0-9]/, "-", /[0-9]/, /[0-9]/]
    };
  },
  /**
   * @deprecated
   * please using
   * @link SrMaskService#date()
   */
  date: (mask?: Array<any>, pipe?: string) => {
    mask = isEmpty(mask) ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : mask;
    pipe = isEmpty(pipe) ? createAutoCorrectedDatePipe("dd/MM/yyyy") : createAutoCorrectedDatePipe(pipe);
    return {
      mask: mask,
      placeholderChar: " ",
      keepCharPositions: false,
      pipe: pipe
    };
  }
};


/**
 * *
 * @deprecated
 * please using
 * @link SrMaskService#addCustomMaskInput
 *
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
function addCustomMaskInput(textMaskConfig) {
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
 *
 * @deprecated
 * please using
 * @link SrMaskService#addCustomMaskDateInput
 */
function addCustomMaskDateInput(ref: ViewContainerRef, mask?: Array<any>, pipe?: string): any {
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
  const custom = SrMaskUtil.date(mask, pipe);
  custom["inputElement"] = ref.element.nativeElement;
  return addCustomMaskInput(custom);
}


export {SrMaskUtil, addCustomMaskInput, addCustomMaskDateInput};
