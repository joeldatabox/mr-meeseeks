import {SrCriterion, SrCriterionParam} from "./sr-criterion";
import {SrOperators} from "./sr-operators";

export class SrIs extends SrCriterion {

  constructor(key: string, value: string) {
    super();
    this.key = key;
    const values = new Array();
    values.push(value);
    this.value = values;
    this.operator = SrOperators.IS;
  }

  build(): Array<SrCriterionParam> {
    if (this.value[0] === "") {
      return null;
    }
    return Array.of(new SrCriterionParam(this.key + this.operator, this.value[0]));
  }

  toString(): string {
    if (this.value[0] === "") {
      return null;
    }
    return this.key + this.operator + "=" + this.value[0];
  }
}

export function $is(key: string, value: string): SrIs {
  return new SrIs(key, value);
}
