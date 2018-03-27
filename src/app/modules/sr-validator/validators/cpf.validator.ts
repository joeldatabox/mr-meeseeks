import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isEmpty} from "../../sr-utils";

export function validateCpf(control: AbstractControl): ValidationErrors {
  if (!validateCPF(control.value)) {
    return {
      "cpf": "invalid"
    };
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
