import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isEmpty, isNullOrUndefined, isString} from "../../sr-utils/commons/sr-commons.model";

const INVALID_RESULT = {
  "cpf": "invalid"
};

export function validateCpf(control: AbstractControl | string): ValidationErrors {
  if (isNullOrUndefined(control)) {
    return INVALID_RESULT;
  }
  let value: any = null;
  if (isString(control)) {
    value = (control as string);
  } else {
    value = (control as AbstractControl).value;
  }
  if (!validateCPF(value)) {
    return INVALID_RESULT;
  }
  return null;
}

function validateCPF(cpf: string): boolean {
  if (isEmpty(cpf)) {
    return false;
  }
  cpf = cpf.replace(/\./gi, "").replace(/\-/gi, "").replace(/\_/gi, "");
  let soma;
  let resto;
  soma = 0;
  if (cpf === "00000000000") return false;

  for (let i = 1; i <= 9; i++) soma = soma + Number(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== Number(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma = soma + Number(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== Number(cpf.substring(10, 11))) return false;
  return true;
}
