import {isNotNullOrUndefined} from "../../sr-utils";

export class Color {
  value: string;

  constructor(value?: string) {
    this.value = isNotNullOrUndefined(value) ? value : null;
  }

  toNativeValue(): string {
    return this.value;
  }
}
