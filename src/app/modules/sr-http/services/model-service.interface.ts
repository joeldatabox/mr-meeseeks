import {Observable} from "rxjs/Observable";

import {ListResource, Model} from "../model";
import {SrQuery} from "../sr-criteria";


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
