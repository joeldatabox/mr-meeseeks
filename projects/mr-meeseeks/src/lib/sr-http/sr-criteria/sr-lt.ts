import {SrCriterion} from "./sr-criterion";
import {SrOperators} from "./sr-operators";

export class SrLt extends SrCriterion {

  constructor(key: string, value: string) {
    super();
    this.key = key;
    const values = new Array();
    values.push(value);
    this.value = values;
    this.operator = SrOperators.LT;
  }

  build(): string {
    if (this.value[0] === "") {
      return null;
    }
    return this.key.trim() + this.operator + "=" + this.value[0];
  }
}

export function $lt(key: string, value: string): SrLt {
  return new SrLt(key, value);
}
