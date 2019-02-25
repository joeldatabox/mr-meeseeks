import {validateCpf} from "./validators/cpf.validator";
import {validateCellNumber} from "./validators/cell.validator";
import {validateFoneNumber} from "./validators/fone.validator";
import {nonNegative, positiveOnly} from "./validators/number.validator";

const SrValidators = {
  cpf: validateCpf,
  cell: validateCellNumber,
  fone: validateFoneNumber,
  nonNegative: nonNegative,
  positiveOnly: positiveOnly
};

export {SrValidators};
