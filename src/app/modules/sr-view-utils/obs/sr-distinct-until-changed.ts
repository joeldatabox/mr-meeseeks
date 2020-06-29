import {Observable, OperatorFunction} from "rxjs";

export function srDistinctUntilChanged<T>(): OperatorFunction<T, T> {
  return function (source$: Observable<T>): Observable<T> {
    let lastValue = null;
    return new Observable<T>(observer => {
      const wrapper = {
        next: value => {
          const stringfiedValue = JSON.stringify(value);
          if (stringfiedValue !== lastValue) {
            lastValue = stringfiedValue;
            observer.next(value);
          }
        },
        error: observer.error,
        complete: observer.complete
      };
      return source$.subscribe(wrapper);
    });
  };
}
