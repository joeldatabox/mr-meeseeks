import {validateCpf} from "./validators/cpf.validator";
import {validateCellNumber} from "./validators/cell.validator";
import {validateFoneNumber} from "./validators/fone.validator";

const SrValidators = {
  cpf: validateCpf,
  cell: validateCellNumber,
  fone: validateFoneNumber,
};

export {SrValidators};
