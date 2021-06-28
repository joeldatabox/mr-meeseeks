import {SrOrderBy} from "./sr-order-by";
import {SrOperators} from "./sr-operators";

export class SrOderByDesc extends SrOrderBy {
  constructor(value: string[]);
  constructor(value: string);
  constructor(value?: any) {
    super(SrOperators.ORDER_BY_DESC, value);
  }
}

export function $orderByDesc(value: string[]);
export function $orderByDesc(value: string);
export function $orderByDesc(value?: any): SrOderByDesc {
  return new SrOderByDesc(value);
}
