import {SrCriterion} from "./sr-criterion";
import {SrOperators} from "./sr-operators";
import {isNotNullOrUndefined, isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";

export class SrOr extends SrCriterion {
  private criterions: Array<SrCriterion>;

  constructor(criterions: Array<SrCriterion>);
  constructor(...criterions: SrCriterion[]);
  constructor(criterions?: any) {
    super();
    this.operator = SrOperators.OR;
    if (!isNullOrUndefined(criterions)) {
      this.criterions = criterions;
    } else {
      this.criterions = new Array();
    }
  }

  build(): string {
    let query = "";
    this.criterions.forEach((cri: SrCriterion) => {
      let value = cri.build();
      if (isNotNullOrUndefined(value)) {
        query += value + ";;";
      }
    });
    if (query.length != 0) {
      query = query.substr(0, query.length - 2);
    }
    if (query === "") {
      return null;
    }
    return SrOperators.OR + "=[" + query + "]";
  }
}


export function $or(...criterions: SrCriterion[]): SrOr {
  return new SrOr(criterions);
}
