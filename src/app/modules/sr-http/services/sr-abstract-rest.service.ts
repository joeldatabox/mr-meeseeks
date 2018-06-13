import {SrHttpService} from "./sr-http.service";
import {SrQuery} from "../sr-criteria";
import {isNotNullOrUndefined, isNullOrUndefined, isString, SrLogg} from "../../sr-utils";
import {Observable} from "rxjs";
import {deserialize, plainToClass, serialize} from "class-transformer";
import {Model} from "../model/model";
import {ListResource} from "../model/list-resource.model";
import {MetaData} from "../model/metadata.model";
import {throwErrorMessage} from "../model";
import {ModelService} from "./model-service.interface";
import {catchError, expand, map, mergeMap, takeWhile} from "rxjs/operators";
import {of} from "rxjs/observable/of";

export abstract class SrAbstractRestService<T extends Model> implements ModelService<T> {
  protected readonly log: SrLogg = SrLogg.of(this.labelLog);

  constructor(private clazz: any, private serviceUrl: string, private http: SrHttpService) {
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
          this.log.i("PUT[" + this.buildServiceUrl() + "/" + value.id + "]", JSON.parse(payload));
          return payload;
        }),
        mergeMap(payload =>
          this.http
            .createRequest()
            .url(this.buildServiceUrl() + "/" + value.id)
            .put(payload)
            .pipe(
              map((result) => deserialize(this.clazz, JSON.stringify(result))),
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
              map((result) => JSON.stringify(result)),
              map((value: any) => deserialize(this.clazz, value)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
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
              map((result) => JSON.stringify(result)),
              map((value: any) => deserialize(this.clazz, value)),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
  }

  delete(value: T): Observable<T> {
    return of(value)
      .pipe(
        map(_value => {
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
              map((result) => {
                const list = new ListResource<T>();
                if (isNotNullOrUndefined(result)) {
                  list.records = <Array<T>>plainToClass(this.clazz, result.records);
                  list._metadata = deserialize(MetaData, JSON.stringify(result._metadata));
                  this.log.d("payload", list);
                }
                return list;
              }),
              catchError((err) => throwErrorMessage(err, this.log))
            )
        )
      );
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

  protected get labelLog(): string {
    return "AbstractRestService<T>";
  }

}
