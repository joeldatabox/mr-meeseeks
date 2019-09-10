import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isNotNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";
import {validateCpf} from "./cpf.validator";
import {validateCnpj} from "./cnpj.validator";

const INVALID_RESULT = {
  "cpfCnpj": "invalid"
};

export function validateCpfCnpj(control: AbstractControl | string): ValidationErrors {
  if (isNotNullOrUndefined(validateCpf(control)) || isNotNullOrUndefined(validateCnpj(control))) {
    return INVALID_RESULT;
  }
  return null;
}
