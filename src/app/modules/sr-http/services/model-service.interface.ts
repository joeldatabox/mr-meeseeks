import {Observable} from "rxjs/Observable";
import {ListResource, SrQuery} from "sr-meeseeks";
import {Model} from "../model";


export interface ModelService<T extends Model> {
  save(value: T): Observable<T>;

  update(value: T): Observable<T>;

  findById(id: any): Observable<T>;

  first(): Observable<T>;

  delete(value: T): Observable<T>;

  count(): Observable<number>;

  list(query?: SrQuery | string): Observable<ListResource<T>>;

  listAll(query?: SrQuery | string): Observable<ListResource<T>>;
}
