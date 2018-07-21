import {SrCriterion, SrCriterionParam} from "./sr-criterion";
import {SrOperators} from "./sr-operators";

export class SrGte extends SrCriterion {

  constructor(key: string, value: string) {
    super();
    this.key = key;
    const values = new Array();
    values.push(value);
    this.value = values;
    this.operator = SrOperators.GTE;
  }

  build(): Array<SrCriterionParam> {
    if (this.value[0] === "") {
      return null;
    }
    return Array.of(new SrCriterionParam(this.key.trim() + this.operator, this.value[0]));
  }
}

export function $gte(key: string, value: string): SrGte {
  return new SrGte(key, value);
}
