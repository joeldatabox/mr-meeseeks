import {isNotNullOrUndefined} from "../../sr-utils";

export abstract class SrCriterion {
  operator: string;
  key: string;
  value: Array<string>;


  constructor() {
  }

  abstract build(): Array<SrCriterionParam>;

  abstract toString(): string;

  isValid(): boolean {
    return isNotNullOrUndefined(this.build());
  }
}

export class SrCriterionParam {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}
