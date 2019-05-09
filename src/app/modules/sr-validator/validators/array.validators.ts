import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isArray, isEmpty, isNullOrUndefined} from "../../sr-utils";

const INVALID_RESULT = {
  "array": "is empty"
};

export namespace array {
  export function min(lenght: number) {
    //criando callback com validação
    return function (control: AbstractControl | Array<any>): ValidationErrors {
      if (isEmpty(control)) {
        return INVALID_RESULT;
      }

      if (toArray(control).length < lenght) {
        return INVALID_RESULT;
      }
      return null;
    };
  }

  export function max(lenght: number) {
    //criando callback com validação
    return function (control: AbstractControl | Array<any>): ValidationErrors {
      if (isEmpty(control)) {
        return INVALID_RESULT;
      }

      if (toArray(control).length > lenght) {
        return INVALID_RESULT;
      }
      return null;
    };
  }

  export function between(minValue: number, maxValue: number) {
    //verificando os parametros
    if (isNullOrUndefined(minValue, maxValue) || minValue > maxValue) {
      throw new Error("Parameters invalid");
    }

    //criando callback com validação
    return function (control: AbstractControl | Array<any>): ValidationErrors {
      if (isEmpty(control)) {
        return INVALID_RESULT;
      }
      const length = toArray(control).length;
      if (length >= minValue && length <= maxValue) {
        return INVALID_RESULT;
      }
      return null;
    };
  }

  function toArray(control: AbstractControl | Array<any>): Array<any> {
    if (isArray(control)) {
      return (control as Array<any>);
    } else {
      return (control as AbstractControl).value;
    }
  }
}
