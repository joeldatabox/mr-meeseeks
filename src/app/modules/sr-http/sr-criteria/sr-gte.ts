import {SrCriterion} from "./sr-criterion";
import {SrOperators} from "./sr-operators";

export class SrGte extends SrCriterion {

  constructor(key: string, value: string) {
    super();
    this.key = key;
    let values = new Array();
    values.push(value);
    this.value = values;
    this.operator = SrOperators.GTE;
  }

  build(): string {
    if (this.value[0] === "") {
      return null;
    }
    return this.key.trim() + this.operator + "=" + this.value[0];
  }
}

export function $gte(key: string, value: string): SrGte {
  return new SrGte(key, value);
}
