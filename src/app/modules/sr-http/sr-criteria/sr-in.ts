import {SrCriterion} from "./sr-criterion";
import {SrOperators} from "./sr-operators";

export class SrIn extends SrCriterion {
  constructor(key: string, value: string[]);
  constructor(key: string, value: string);
  constructor(key: string, value?: any) {
    super();
    if (!(value instanceof Array)) {
      const values = new Array();
      values.push(value);
      value = values;
    }
    this.key = key;
    this.value = value;
    this.operator = SrOperators.IN;
  }

  build(): string {
    if (this.value[0] === "") {
      return null;
    }
    return this.key.trim() + this.operator + "=" + this.value[0];
  }
}

export function $in(key: string, value: string[]);
export function $in(key: string, value: string);
export function $in(key: string, value?: any): SrIn {
  return new SrIn(key, value);
}
