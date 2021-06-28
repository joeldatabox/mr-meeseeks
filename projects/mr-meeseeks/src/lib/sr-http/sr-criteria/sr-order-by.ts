import {SrCriterion} from "./sr-criterion";
import {isNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";


export class SrOrderBy extends SrCriterion {
  constructor(operator: string, value: string[]);
  constructor(operator: string, value: string);
  constructor(operator: string, value?: any) {
    super();
    if (!(value instanceof Array)) {
      const values = new Array();
      values.push(value);
      value = values;
    }
    this.value = value;
    this.operator = operator;
  }

  build(): string {
    if (isNullOrUndefined(this.value)) return null;
    return this.operator + "=" + this.buildMultParams(this.value);
  }

  protected buildMultParams(values: Array<string>) {
    let params = ";";
    values.forEach(i => params += i + ";");
    return params;
  }
}
