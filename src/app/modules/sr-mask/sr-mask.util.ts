import emailMask from "text-mask-addons/dist/emailMask";
import {createAutoCorrectedDatePipe} from "text-mask-addons/dist/textMaskAddons";

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
  date: () => {
    return {
      mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/],
      placeholderChar: " ",
      keepCharPositions: false,
      pipe: createAutoCorrectedDatePipe("dd/mm/yyyy")
    };
  }
};

export {SrMaskUtil};
