import {Observable} from "rxjs";

import {ListResource, Model} from "../model";
import {SrQuery} from "../sr-criteria";


export interface ModelService<T extends Model> {
  /**
   * Save a simple record
   * @param value -> value to be saved
   */
  save(value: T): Observable<T>;

  /**
   * Update a simple record
   * @param value -> value to be updated
   */
  update(value: T): Observable<T>;

  /**
   * Find a record by id
   * @param id -> id desired
   */
  findById(id: any): Observable<T>;

  /**
   * Find a list of record by id
   * @param id -> array of id desired
   */
  findByIds(ids: Array<string | T>): Observable<Array<T>>;

  /**
   * Find a list of record by id
   * @param id -> array of id desired
   */
  findByIds(...ids: T[] | string[]): Observable<Array<T>>;

  /**
   * Find a list of record by id
   * @param id -> array of id desired
   */
  findByIds(ids: any): Observable<Array<T>>;

  /**
   * Find a record by id fully
   * @param id -> id desired
   */
  findByIdFully(id: any): Observable<T>;

  /**
   * Get a first record of database
   */
  first(): Observable<T>;

  /**
   * Get a first record of database fully
   */
  firstFully(): Observable<T>;

  /**
   * Delete a simple record
   * @param value -> record desired
   */
  delete(value: T): Observable<T>;

  /**
   * Count total of records
   */
  count(): Observable<number>;

  /**
   * Lists the logs in a paginated fashion
   * @query -> criterions
   */
  list(query?: SrQuery | string): Observable<ListResource<T>>;

  /**
   * Lists the records in a paginated fashion fully
   * @query -> criterions
   */
  listFully(query?: SrQuery | string): Observable<ListResource<T>>;

  /**
   * Lists all the records
   * @query -> criterions
   */
  listAll(query?: SrQuery | string): Observable<ListResource<T>>;

  /**
   * Lists all the records fully
   * @query -> criterions
   */
  listAllFully(query?: SrQuery | string): Observable<ListResource<T>>;
}
