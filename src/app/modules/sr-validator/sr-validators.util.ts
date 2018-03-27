import {validateCpf} from "./validators/cpf.validator";
import {validateCellNumber} from "./validators/cell.validator";
import {validateFoneNumber} from "./validators/fone.validator";

export class SrValidators {
  readonly cpf = validateCpf;
  readonly cell = validateCellNumber;
  readonly fone = validateFoneNumber;
}

