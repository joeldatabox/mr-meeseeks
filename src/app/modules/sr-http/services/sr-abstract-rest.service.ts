import {SrHttpService} from "./sr-http.service";
import {SrQuery} from "../sr-criteria";
import {isNotNullOrUndefined, isNullOrUndefined, isString, SrLogg} from "../../sr-utils";
import {forkJoin, Observable, of} from "rxjs";
import {deserialize, plainToClass, serialize} from "class-transformer";
import {Model} from "../model/model";
import {ListResource} from "../model/list-resource.model";
import {MetaData} from "../model/metadata.model";
import {throwErrorMessage} from "../model";
import {ModelService} from "./model-service.interface";
import {catchError, expand, map, mergeMap, takeWhile} from "rxjs/operators";

export abstract class SrAbstractRestService<T extends Model> implements ModelService<T> {
  protected readonly log: SrLogg = SrLogg.of(this.labelLog);

  constructor(protected clazz: any, protected serviceUrl: string, protected http: SrHttpService) {
  }

  protected buildServiceUrl(query?: SrQuery) {
    if (isNullOrUndefined(query)) {
      return this.serviceUrl;
    }
    return this.serviceUrl + query.build();
  }

  save(value: T): Observable<T> {
    return of(serialize(value))
      .pipe(
        map(payload => {
          // @ts-ignore
          this.log.i("POST[" + this.buildServiceUrl() + "]", JSON.parse(payload));
          return payload;
        }),
        mergeMap(payload =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl())
            .post(payload)
            //pelo fato de ser um poste não se tem necessidade de se pegar a resposta
            //.map((res: Response) => res.json())
            .pipe(
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  update(value: T): Observable<T> {
    return of(serialize(value))
      .pipe(
        map(payload => {
          // @ts-ignore
          this.log.i("PUT[" + this.buildServiceUrl() + "/" + value.id + "]", JSON.parse(payload));
          return payload;
        }),
        mergeMap(payload =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl() + "/" + value.id)
            .put(payload)
            .pipe(
              // @ts-ignore
              //map((result) => deserialize(this.clazz, JSON.stringify(result))),
              map((result) => this.deserializeItem(result)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  findById(id: any): Observable<T> {
    return of(id)
      .pipe(
        map(_id => {
          this.log.i("GET[" + this.buildServiceUrl() + "/" + _id + "]");
          return _id;
        }),
        mergeMap(_id =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl() + "/" + _id)
            .get()
            .pipe(
              // @ts-ignore
              /*map((result) => JSON.stringify(result)),
              map((value: any) => deserialize(this.clazz, value)),*/
              map((result) => this.deserializeItem(result)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  findByIds(ids: Array<string | T>): Observable<Array<T>>;
  findByIds(...ids: T[] | string[]): Observable<Array<T>>;
  findByIds(ids: any): Observable<Array<T>> {
    return of(ids)
      .pipe(
        //pegando apenas os ids em forma de string
        map((idss: Array<string | T>) => {
          return idss.filter(id => isNotNullOrUndefined(id))
            .map(id => isString(id) ? id as string : (id as T).id);
        }),
        //removendo qualquer id repetido
        map((idss: Array<string>) => Array.from(new Set(idss))),
        //criando pool de requisições para carregar os itens
        map((idss: Array<string>) => idss.map(id => this.findById(id))),
        mergeMap((idsRequest) => {
          return forkJoin(idsRequest);
        })
      );
  }

  findByIdFully(id: any): Observable<T> {
    return this.findById(id);
  }

  first(): Observable<T> {
    return of(null)
      .pipe(
        map(() => this.log.i("GET[" + this.buildServiceUrl() + "/first]")),
        mergeMap(() =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl() + "/first")
            .get()
            .pipe(
              // @ts-ignore
              /*map((result) => JSON.stringify(result)),
              map((value: any) => deserialize(this.clazz, value)),*/
              map((result) => this.deserializeItem(result)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  firstFully(): Observable<T> {
    return this.first();
  }

  delete(value: T): Observable<T> {
    return of(value)
      .pipe(
        map(_value => {
          // @ts-ignore
          this.log.i("DELETE[" + this.buildServiceUrl() + "/" + _value.id + "]", JSON.parse(serialize(_value)));
          return _value;
        }),
        mergeMap(_value =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl() + "/" + _value.id)
            .delete()
            //.map((res: Response) => res.json())
            .pipe(
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  count(): Observable<number> {
    return of(null)
      .pipe(
        map(() => this.log.i("GET[" + this.buildServiceUrl() + "/count" + "]")),
        mergeMap(() =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl() + "/count")
            .acceptTextOnly()
            .get()
            .pipe(
              // @ts-ignore
              map((value: string) => Number(value)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  list(query?: SrQuery | string): Observable<ListResource<T>> {
    return of(query)
      .pipe(
        map(() => isString(query) ? query as string : this.buildServiceUrl(query as SrQuery)),
        map(url => {
          this.log.i("GET[" + url + "]");
          return url;
        }),
        mergeMap(url =>
          this.http
            .createRequest()
            .url(url)
            .get()
            .pipe(
              /*map((result) => {
                const list = new ListResource<T>();
                if (isNotNullOrUndefined(result)) {
                  // @ts-ignore
                  list.records = <Array<T>>plainToClass(this.clazz, result.records);
                  // @ts-ignore
                  list._metadata = deserialize(MetaData, JSON.stringify(result._metadata));
                  this.log.d("payload", list);
                }
                return list;
              }),*/
              map((result) => this.deserializeListResource(result)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  listFully(query?: SrQuery | string): Observable<ListResource<T>> {
    return this.list(query);
  }

  listAll(query?: SrQuery | string): Observable<ListResource<T>> {
    return of(query)
      .pipe(
        mergeMap(() =>
          this.list(query)
            .pipe(
              expand((list: ListResource<T>) => list.hasNextPage() ? this.list(list._metadata.nextPage()) : of(null)),
              //devemos continuar o processo enquanto temos um list populado
              takeWhile((list: ListResource<T>) => {
                return isNotNullOrUndefined(list) && !list.isEmpty();
              })
            )
        )
      );
  }

  listAllFully(query?: SrQuery | string): Observable<ListResource<T>> {
    return of(query)
      .pipe(
        mergeMap(() =>
          this.listFully(query)
            .pipe(
              expand((list: ListResource<T>) => list.hasNextPage() ? this.list(list._metadata.nextPage()) : of(null)),
              //devemos continuar o processo enquanto temos um list populado
              takeWhile((list: ListResource<T>) => {
                return isNotNullOrUndefined(list) && !list.isEmpty();
              })
            )
        )
      );
  }

  protected get labelLog(): string {
    return "AbstractRestService<T>";
  }

  protected deserializeItem(value: object): T {
    try {
      const result = deserialize(this.clazz, JSON.stringify(value)) as T;
      this.log.d("payload response", result);
      return result;
    } catch (error) {
      const errorResult = {};
      errorResult["error"] = error;
      errorResult["clazz"] = this.clazz;
      errorResult["payload"] = value;
      this.log.e("error on deserialize item ", errorResult);
      throw errorResult;
    }
  }

  protected deserializeArray(values): Array<T> {
    let itens = new Array<T>();
    if (isNotNullOrUndefined(values)) {
      try {
        itens = <Array<T>>plainToClass(this.clazz, values);
        this.log.d("payload response", itens);
      } catch (error) {
        const errorResult = {};
        errorResult["error"] = error;
        errorResult["clazz"] = this.clazz;
        errorResult["payload"] = values;
        this.log.e("error on deserialize ", errorResult);
        throw errorResult;
      }
    }
    return itens;
  }

  protected deserializeListResource(value: any): ListResource<T> {
    const list = new ListResource<T>();
    if (isNotNullOrUndefined(value)) {
      try {
        list.records = <Array<T>>plainToClass(this.clazz, value.records);
        list._metadata = deserialize(MetaData, JSON.stringify(value._metadata));
        this.log.d("payload response", list);
      } catch (error) {
        const errorResult = {};
        errorResult["error"] = error;
        errorResult["clazz"] = this.clazz;
        errorResult["payload"] = value;
        this.log.e("error on deserialize ", errorResult);
        throw errorResult;
      }
    }
    return list;
  }
}
