import {Observable, OperatorFunction} from "rxjs";
import {isNullOrUndefined} from "../../sr-utils";

const defaultCompator: (lastValue: any, newValue: any) => boolean = (lastValue: any, newValue: any) => {
  return lastValue !== newValue;
};

export function srDistinctUntilChanged<T>(callback?: (lastValue: any, newValue: any) => boolean): OperatorFunction<T, T> {
  return function (source: Observable<T>): Observable<T> {
    let lastValue = null;
    return new Observable<T>(subscriber => {
      source.subscribe({
        next(value: T): void {
          if (isNullOrUndefined(callback)) {
            const stringfiedValue = JSON.stringify(value);
            if (defaultCompator(lastValue, stringfiedValue)) {
              lastValue = stringfiedValue;
              subscriber.next(value);
            }
          } else {
            if (callback(lastValue, value)) {
              lastValue = value;
              subscriber.next(value);
            }
          }
        }, error(err: any): void {
          subscriber.error(err);
        }, complete(): void {
          subscriber.complete();
        }
      });
    });
  };
}
