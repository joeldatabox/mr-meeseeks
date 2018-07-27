import {SrCriterion} from "./sr-criterion";
import {SrOperators} from "./sr-operators";

export class SrContains extends SrCriterion {

  constructor(key: string, value: string) {
    super();
    this.key = key;
    const values = new Array();
    values.push(value);
    this.value = values;
    this.operator = SrOperators.CONTAINS;
  }

  build(): string {
    if (this.value[0] === "") {
      return null;
    }
    return this.key + this.operator + "=" + this.value[0];
  }
}

export function $contains(key: string, value: string): SrContains {
  return new SrContains(key, value);
}
