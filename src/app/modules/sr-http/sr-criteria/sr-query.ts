import {SrCriterion, SrCriterionParam} from "./sr-criterion";
import {isNotNullOrUndefined, isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";

export class SrQuery {
  private criterions: Array<SrCriterion>;

  constructor(criterions: Array<SrCriterion>);
  constructor(...criterions: SrCriterion[]);
  constructor(criterions?: any) {
    if (!isNullOrUndefined(criterions)) {
      this.criterions = criterions;
    } else {
      this.criterions = new Array();
    }
  }

  public and(...criterions: SrCriterion[]): SrQuery {
    criterions.forEach(c => {
      this.criterions.push(c);
    });
    return this;
  }

  build(): SrCriterionParam[] {
    const v: Array<SrCriterionParam> = new Array<SrCriterionParam>();
    this.criterions
      .filter((c) => isNotNullOrUndefined(c) && c.isValid())
      .forEach(c => {
        c.build().forEach(i => v.push(i));
      });
    return v;
  }
}

export function $query(...criterions: SrCriterion[]): SrQuery {
  return new SrQuery(criterions);
}

