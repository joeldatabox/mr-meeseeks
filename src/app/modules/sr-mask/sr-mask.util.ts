import {createTextMaskInputElement} from "text-mask-core/dist/textMaskCore";
import emailMask from "text-mask-addons/dist/emailMask";
import {createAutoCorrectedDatePipe} from "text-mask-addons/dist/textMaskAddons";
import {isEmpty} from "../sr-utils";

const SrMaskUtil = {
  email: () => emailMask,
  fone: () => {
    return {mask: ["(", /[1-9]/, /[1-9]/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]};
  },
  cell: () => {
    return {mask: ["(", /[1-9]/, /[1-9]/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]};
  },
  cpf: () => {
    return {
      mask: [/[0-9]/, /[0-9]/, /[0-9]/, ".", /[0-9]/, /[0-9]/, /[0-9]/, ".", /[0-9]/, /[0-9]/, /[0-9]/, "-", /[0-9]/, /[0-9]/]
    };
  },
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


export {SrMaskUtil, addCustomMaskInput};
