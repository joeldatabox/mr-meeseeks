import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";
import {validateCpf} from "./cpf.validator";
import {validateCnpj} from "./cnpj.validator";

const INVALID_RESULT = {
  "cpfCnpj": "invalid"
};

export function validateCpfCnpj(control: AbstractControl | string): ValidationErrors {
  if (isNullOrUndefined(validateCpf(control)) || isNullOrUndefined(validateCnpj(control))) {
    return null;
  }
  return INVALID_RESULT;
}
