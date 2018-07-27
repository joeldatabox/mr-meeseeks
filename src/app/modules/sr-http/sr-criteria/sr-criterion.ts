export abstract class SrCriterion {
  operator: string;
  key: string;
  value: Array<string>;


  constructor() {
  }

  abstract build(): string;
}
