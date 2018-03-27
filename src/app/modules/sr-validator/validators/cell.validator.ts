import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isEmpty, isString} from "../../sr-utils";

const CELL_REGEX = ".((10)|([1-9][1-9]).)\\s9[6-9][0-9]{3}-[0-9]{4}";
const INVALID_RESULT = {
  "cell": "invalid"
};

export function validateCellNumber(control: AbstractControl): ValidationErrors {
  if ((!isString(control.value)) && isEmpty(control.value)) {
    return INVALID_RESULT;
  }
  if (!control.value.match(CELL_REGEX)) {
    return INVALID_RESULT;
  }
  return null;
}
