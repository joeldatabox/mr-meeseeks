import {isNotNullOrUndefined} from "../../sr-utils";

export abstract class SrCriterion {
  operator: string;
  key: string;
  value: Array<string>;


  constructor() {
  }

  abstract build(): Array<SrCriterionParam>;

  isValid(): boolean {
    return isNotNullOrUndefined(this.build());
  }
}

export class SrCriterionParam {
  key: string;
  value: string | [string];

  constructor(key: string, value: string | [string]) {
    this.key = key;
    this.value = value;
  }
}
