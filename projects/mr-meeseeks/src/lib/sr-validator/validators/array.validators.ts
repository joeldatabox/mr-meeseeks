import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isArray, isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";

const INVALID_RESULT = {
  "array": "is empty"
};

export namespace array {
  export function min(lenght: number) {
    //criando callback com validação
    return function (control: AbstractControl | Array<any>): ValidationErrors {
      const _array = toArray(control);
      if (isNullOrUndefined(array)) {
        return INVALID_RESULT;
      }

      if (_array.length < lenght) {
        return INVALID_RESULT;
      }
      return null;
    };
  }

  export function max(lenght: number) {
    //criando callback com validação
    return function (control: AbstractControl | Array<any>): ValidationErrors {
      const _array = toArray(control);
      if (isNullOrUndefined(array)) {
        return INVALID_RESULT;
      }

      if (_array.length > lenght) {
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
      const _array = toArray(control);
      if (isNullOrUndefined(array)) {
        return INVALID_RESULT;
      }

      if (!(_array.length >= minValue && _array.length <= maxValue)) {
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
