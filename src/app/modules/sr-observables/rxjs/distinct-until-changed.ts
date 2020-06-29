import {Observable, OperatorFunction} from "rxjs";

export function srDistinctUntilChanged<T>(): OperatorFunction<T, T> {
  return function (source$: Observable<T>): Observable<T> {
    let lastValue = null;
    return new Observable<T>(observer => {
      const wrapper = {
        next: value => {
          if (JSON.stringify(value) !== JSON.stringify(lastValue)) {
            lastValue = JSON.stringify(value);
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
