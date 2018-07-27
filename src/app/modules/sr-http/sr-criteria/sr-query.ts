import {SrCriterion} from "./sr-criterion";
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

  build(): string {
    let result = "?";
    this.criterions
      .filter((c) => isNotNullOrUndefined(c))
      .forEach((criterion: SrCriterion) => {
        const value = criterion.build();
        if (isNotNullOrUndefined(value)) {
          result += criterion.build() + "&";
        }
      });
    return result.substr(0, result.length - 1);
  }
}

export function $query(...criterions: SrCriterion[]): SrQuery {
  return new SrQuery(criterions);
}

