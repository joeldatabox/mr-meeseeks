import {isNotNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";

export class Color {
  value: string;

  constructor(value?: string) {
    this.value = isNotNullOrUndefined(value) ? value : null;
  }

  toNativeValue(): string {
    return this.value;
  }
}
