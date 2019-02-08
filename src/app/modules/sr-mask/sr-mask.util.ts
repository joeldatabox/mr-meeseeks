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

export {SrMaskUtil};
