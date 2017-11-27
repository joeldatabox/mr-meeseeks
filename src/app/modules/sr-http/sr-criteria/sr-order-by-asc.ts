import {SrOrderBy} from "./sr-order-by";
import {SrOperators} from "./sr-operators";

export class SrOrderByAsc extends SrOrderBy {
  constructor(value: string[]);
  constructor(value: string);
  constructor(value?: any) {
    super(SrOperators.ORDER_BY_ASC, value);
  }
}

export function $orderByAsc(value: string[]);
export function $orderByAsc(value: string);
export function $orderByAsc(value?: any): SrOrderByAsc {
  return new SrOrderByAsc(value);
}
