import {SrCriterion} from "./sr-criterion";
import {SrOperators} from "./sr-operators";
import {isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";


export class SrLimit extends SrCriterion {
  private number: number;

  constructor(value: number) {
    super();
    this.number = value;
  }

  build(): string {
    if (isNullOrUndefined(this.number)) return null;
    return SrOperators.LIMIT + "=" + this.number;
  }
}

export function $limit(value: number): SrLimit {
  return new SrLimit(value);
}
