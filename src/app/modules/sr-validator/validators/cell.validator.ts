import {AbstractControl, ValidationErrors} from "@angular/forms";
import {isEmpty, isNullOrUndefined, isString} from "../../sr-utils/commons/sr-commons.model";


const CELL_REGEX = ".((10)|([1-9][1-9]).)\\s9[6-9][0-9]{3}-[0-9]{4}";
const INVALID_RESULT = {
  "cell": "invalid"
};

export function validateCellNumber(control: AbstractControl | string): ValidationErrors {
  if (isNullOrUndefined(control)) {
    return INVALID_RESULT;
  }
  if (isString(control)) {
    return validate(control as string);
  }
  return validate((control as AbstractControl).value);
}

function validate(value: any): ValidationErrors {
  if ((!isString(value)) && isEmpty(value)) {
    return INVALID_RESULT;
  }
  if (!value.match(CELL_REGEX)) {
    return INVALID_RESULT;
  }
  return null;
}
