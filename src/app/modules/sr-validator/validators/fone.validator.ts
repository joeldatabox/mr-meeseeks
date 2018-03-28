import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isEmpty, isString} from "../../sr-utils";

const FONE_REGEX = ".((10)|([1-9][1-9]).)\\s[2-5][0-9]{3}-[0-9]{4}";

const INVALID_RESULT = {
  "fone": "invalid"
};

export function validateFoneNumber(control: AbstractControl): ValidationErrors {
  if ((!isString(control.value)) && isEmpty(control.value)) {
    return INVALID_RESULT;
  }
  if (!control.value.match(FONE_REGEX)) {
    return INVALID_RESULT;
  }
  return null;
}