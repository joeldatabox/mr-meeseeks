import {SrCriterion} from "./sr-criterion";
import {SrOperators} from "./sr-operators";

export class SrLte extends SrCriterion {

  constructor(key: string, value: string) {
    super();
    this.key = key;
    const values = new Array();
    values.push(value);
    this.value = values;
    this.operator = SrOperators.LTE;
  }

  build(): string {
    if (this.value[0] === "") {
      return null;
    }
    return this.key.trim() + this.operator + "=" + this.value[0];
  }
}

export function $lte(key: string, value: string): SrLte {
  return new SrLte(key, value);
}
