import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isNullOrUndefined, isNumber, isString} from "../../sr-utils";


const INVALID_RESULT_NO_NEGATIVE = {
  "number": "Please enter a non-negative number"
};

export function nonNegative(control: AbstractControl | string | number): ValidationErrors {
  if (isNullOrUndefined(control)) {
    return INVALID_RESULT_NO_NEGATIVE;
  }
  if (getNumber(control) < 0) {
    return INVALID_RESULT_NO_NEGATIVE;
  }
  return null;
}

const INVALID_RESULT_POSITIVE_ONLY = {
  "number": "Please enter a positive number only"
};

export function positiveOnly(control: AbstractControl | string | number): ValidationErrors {
  if (isNullOrUndefined(control)) {
    return INVALID_RESULT_POSITIVE_ONLY;
  }
  if (getNumber(control) <= 0) {
    return INVALID_RESULT_POSITIVE_ONLY;
  }
  return null;
}


function getNumber(control: AbstractControl | string | number): number {
  let value: any = null;
  if (isString(control)) {
    value = (control as string);
  } else if (isNumber(control)) {
    value = control as number;
  } else {
    value = (control as AbstractControl).value;
  }
  return Number(value);
}
