import {SrHttpService} from "./sr-http.service";
import {SrQuery} from "../sr-criteria";
import {isEmpty, isNotNullOrUndefined, isString, SrLogg} from "../../sr-utils";
import {forkJoin, Observable, of} from "rxjs";
import {deserialize, plainToClass, serialize} from "class-transformer";
import {Model} from "../model/model";
import {ListResource} from "../model/list-resource.model";
import {MetaData} from "../model/metadata.model";
import {throwErrorMessage} from "../model";
import {ModelService, PathVariable} from "./model-service.interface";
import {catchError, expand, map, mergeMap, takeWhile} from "rxjs/operators";

export abstract class SrAbstractRestService<T extends Model> implements ModelService<T> {
  protected readonly log: SrLogg = SrLogg.of(this.constructor.name);

  constructor(protected clazz: any, protected serviceUrl: string, protected http: SrHttpService) {
  }

  protected buildServiceUrl(query?: SrQuery | string, pathVariable?: PathVariable): string {
    let url: string = "";

    if (isNotNullOrUndefined(query)) {
      url = isString(query) ? query as string : this.serviceUrl + (query as SrQuery).build();
    } else {
      url = this.serviceUrl;
    }

    if (isNotNullOrUndefined(pathVariable)) {
      Object.keys(pathVariable)
        .forEach((key: string) => {
          url = url.replace("{" + key + "}", pathVariable[key]);
        });
    }
    return url;
  }

  save(value: T, pathVariable?: PathVariable): Observable<T> {
    return of(serialize(value))
      .pipe(
        mergeMap(payload =>
          this.http
            .createRequest()
            .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable))
            .post(payload)
            //pelo fato de ser um poste não se tem necessidade de se pegar a resposta
            //.map((res: Response) => res.json())
            .pipe(
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  update(value: T, pathVariable?: PathVariable): Observable<T> {
    return of(serialize(value))
      .pipe(
        mergeMap(payload =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl(null, pathVariable) + "/" + value.id)
            .put(payload)
            .pipe(
              map((result) => this.deserializeItem(result)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  findById(id: any, pathVariable?: PathVariable): Observable<T> {
    return of(id)
      .pipe(
        mergeMap(_id =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl(null, pathVariable) + "/" + _id)
            .get()
            .pipe(
              map((result) => this.deserializeItem(result)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  findByIds(ids: Array<string | T>, pathVariable?: PathVariable): Observable<Array<T>>;
  findByIds(ids: any, pathVariable?: PathVariable): Observable<Array<T>> {
    return of(ids)
      .pipe(
        mergeMap((idss: Array<string | T>) => {
          //se não tiver itens válidos, devemos retornar um array vazio
          if (isEmpty(idss)) {
            return of([]);
          }
          //pegando apenas itens válidos
          const _ids = idss
            .filter(id => isNotNullOrUndefined(id))
            .map(id => isString(id) ? id as string : (id as T).id);

          if (isEmpty(_ids)) {
            return of([]);
          }
          return of(_ids)
            .pipe(
              //removendo qualquer id repetido
              map((_idss: Array<string>) => Array.from(new Set(_idss))),
              //criando pool de requisições para carregar os itens
              map((_idss: Array<string>) => _idss.map(id => this.findById(id, pathVariable))),
              mergeMap((idsRequest) => forkJoin(idsRequest))
            );
        })
      );
  }

  findByIdFully(id: any, pathVariable?: PathVariable): Observable<T> {
    return this.findById(id, pathVariable);
  }

  first(pathVariable?: PathVariable): Observable<T> {
    return of(null)
      .pipe(
        mergeMap(() =>
          this.http
            .createRequest()
            .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable) + "/first")
            .get()
            .pipe(
              map((result) => this.deserializeItem(result)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  firstFully(pathVariable?: PathVariable): Observable<T> {
    return this.first(pathVariable);
  }

  delete(value: T, pathVariable?: PathVariable): Observable<T> {
    return of(value)
      .pipe(
        mergeMap(_value =>
          this.http
            .createRequest()
            .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable) + "/" + _value.id)
            .delete()
            .pipe(
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  count(pathVariable?: PathVariable): Observable<number> {
    return of(null)
      .pipe(
        mergeMap(() =>
          this.http
            .createRequest()
            .usingLog(this.log)
            .url(this.buildServiceUrl(null, pathVariable) + "/count")
            .acceptTextOnly()
            .get()
            .pipe(
              map((value: string) => Number(value)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  list(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>> {
    return of([query])
      .pipe(
        map(() => this.buildServiceUrl(query, pathVariable)),
        mergeMap(url =>
          this.http
            .createRequest()
            .usingLog(this.log)
            .url(url)
            .get()
            .pipe(
              map((result) => this.deserializeListResource(result)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  listFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>> {
    return this.list(query, pathVariable);
  }

  listAll(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>> {
    return of(query)
      .pipe(
        mergeMap(() =>
          this.list(query, pathVariable)
            .pipe(
              expand((list: ListResource<T>) => list.hasNextPage() ? this.list(list._metadata.nextPage(), pathVariable) : of(null)),
              //devemos continuar o processo enquanto temos um list populado
              takeWhile((list: ListResource<T>) => {
                return isNotNullOrUndefined(list) && !list.isEmpty();
              })
            )
        )
      );
  }

  listAllFully(query?: SrQuery | string, pathVariable?: PathVariable): Observable<ListResource<T>> {
    return of(query)
      .pipe(
        mergeMap(() =>
          this.listFully(query)
            .pipe(
              expand((list: ListResource<T>) => list.hasNextPage() ? this.list(list._metadata.nextPage(), pathVariable) : of(null)),
              //devemos continuar o processo enquanto temos um list populado
              takeWhile((list: ListResource<T>) => {
                return isNotNullOrUndefined(list) && !list.isEmpty();
              })
            )
        )
      );
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
