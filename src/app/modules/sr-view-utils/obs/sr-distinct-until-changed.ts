import {Observable, OperatorFunction} from "rxjs";

export function srDistinctUntilChanged<T>(): OperatorFunction<T, T> {
  return function (source: Observable<T>): Observable<T> {
    let lastValue = null;
    return new Observable<T>(subscriber => {
      source.subscribe({
        next(value: T): void {
          const stringfiedValue = JSON.stringify(value);
          if (stringfiedValue !== lastValue) {
            lastValue = stringfiedValue;
            subscriber.next(value as any);
          }
        }, error(err: any): void {
          subscriber.error(err);
        }, complete(): void {
          subscriber.complete();
        }
      });
    });
  };

  /*return function (source$: Observable<T>): Observable<T> {
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
  };*/
}
