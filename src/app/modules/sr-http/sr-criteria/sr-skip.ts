import {SrCriterion, SrCriterionParam} from "./sr-criterion";
import {SrOperators} from "./sr-operators";
import {isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";

export class SrSkip extends SrCriterion {
  private number: number;

  constructor(value: number) {
    super();
    this.number = value;
  }

  build(): Array<SrCriterionParam> {
    if (isNullOrUndefined(this.number)) return null;
    return Array.of(new SrCriterionParam(SrOperators.SKIP, this.number.toString()));
  }
}

export function $skip(value: number): SrSkip {
  return new SrSkip(value);
}
