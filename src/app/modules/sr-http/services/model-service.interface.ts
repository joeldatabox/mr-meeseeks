import {Observable} from "rxjs";

import {ListResource} from "../model/list-resource.model";
import {Model} from "../model/model";
import {SrQuery} from "../sr-criteria/sr-query";

export declare interface PathVariable {
  [key: string]: any;
}

export interface ModelService<T extends Model> {
  type: any;

  /**
   * Save a simple record
   * @param value -> value to be saved
   */
  save(value: T, pathVariable?: PathVariable): Observable<T>;

  /**
   * Update a simple record
   * @param value -> value to be updated
   */
  update(value: T, pathVariable?: PathVariable): Observable<T>;

  /**
   * Find a record by id
   * @param id -> id desired
   */
  findById(id: string | T, pathVariable?: PathVariable): Observable<T>;

  /**
   * Find a list of record by id
   * @param ids -> array of id desired
   */
  findByIds(ids: Array<string | T>, pathVariable?: PathVariable): Observable<Array<T>>;

  /**
   * Find a list of record by id
   * @param ids -> array of id desired
   */
  findByIds(ids: any, pathVariable?: PathVariable): Observable<Array<T>>;

  /**
   * Find a record by id fully
   * @param ids -> id desired
   */
  findByIdFully(ids: any, pathVariable?: PathVariable): Observable<T>;

  /**
   * Get a first record of database
   */
  first(pathVariable?: PathVariable): Observable<T>;

  /**
   * Get a first record of database fully
   */
  firstFully(pathVariable?: PathVariable): Observable<T>;

  /**
   * Delete a simple record
   * @param value -> record desired
   */
  delete(value: T, pathVariable?: PathVariable): Observable<T>;

  /**
   * Count total of records
   */
  count(pathVariable?: PathVariable): Observable<number>;

  /**
   * Lists the logs in a paginated fashion
   * @query -> criterions
   */
  list(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>>;

  /**
   * Lists the records in a paginated fashion fully
   * @query -> criterions
   */
  listFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>>;

  /**
   * Lists all the records
   * @query -> criterions
   */
  listAll(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>>;

  /**
   * Lists all the records fully
   * @query -> criterions
   */
  listAllFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>>;
}
