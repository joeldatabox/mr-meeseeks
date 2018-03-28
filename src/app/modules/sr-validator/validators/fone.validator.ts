import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isEmpty, isNullOrUndefined, isString} from "../../sr-utils";

const FONE_REGEX = ".((10)|([1-9][1-9]).)\\s[2-5][0-9]{3}-[0-9]{4}";

const INVALID_RESULT = {
  "fone": "invalid"
};

export function validateFoneNumber(control: AbstractControl | string): ValidationErrors {
  if (isNullOrUndefined(control)) {
    return INVALID_RESULT;
  }
  if (isString(control)) {
    return validate(control as string);
  }
  return validate((control as AbstractControl).value);
}

function validate(value: any) {
  if ((!isString(value)) && isEmpty(value)) {
    return INVALID_RESULT;
  }
  if (!value.match(FONE_REGEX)) {
    return INVALID_RESULT;
  }
  return null;
}
