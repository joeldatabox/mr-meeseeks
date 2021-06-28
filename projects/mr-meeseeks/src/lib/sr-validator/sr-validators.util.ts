import {validateCpf} from "./validators/cpf.validator";
import {validateCellNumber} from "./validators/cell.validator";
import {validateFoneNumber} from "./validators/fone.validator";
import {nonNegative, positiveOnly} from "./validators/number.validator";
import {array} from "./validators/array.validators";
import {validateCnpj} from "./validators/cnpj.validator";
import {validateCpfCnpj} from "./validators/cpfCnpj.validator";

const SrValidators = {
  cpf: validateCpf,
  cnpj: validateCnpj,
  cpfCnpj: validateCpfCnpj,
  cell: validateCellNumber,
  fone: validateFoneNumber,
  nonNegative: nonNegative,
  positiveOnly: positiveOnly,
  array: array
};

export {SrValidators};
