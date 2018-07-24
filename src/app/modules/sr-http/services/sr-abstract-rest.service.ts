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

  /*protected buildServiceUrl(query?: SrQuery) {
    if (isNullOrUndefined(query)) {
      return this.serviceUrl;
    }
    return this.serviceUrl + query.build();
  }*/

  save(value: T): Observable<T> {
    return of(serialize(value))
      .pipe(
        map(payload => {
          this.log.i("POST[" + this.serviceUrl + "]", JSON.parse(payload));
          return payload;
        }),
        mergeMap(payload =>
          this.http
            .createRequest()
            .url(this.serviceUrl)
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
          this.log.i("PUT[" + this.serviceUrl + "/" + value.id + "]", JSON.parse(payload));
          return payload;
        }),
        mergeMap(payload =>
          this.http
            .createRequest()
            .url(this.serviceUrl + "/" + value.id)
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
          this.log.i("GET[" + this.serviceUrl + "/" + _id + "]");
          return _id;
        }),
        mergeMap(_id =>
          this.http
            .createRequest()
            .url(this.serviceUrl + "/" + _id)
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
        map(() => this.log.i("GET[" + this.serviceUrl + "/first]")),
        mergeMap(() =>
          this.http
            .createRequest()
            .url(this.serviceUrl + "/first")
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
          this.log.i("DELETE[" + this.serviceUrl + "/" + _value.id + "]", JSON.parse(serialize(_value)));
          return _value;
        }),
        mergeMap(_value =>
          this.http
            .createRequest()
            .url(this.serviceUrl + "/" + _value.id)
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
        map(() => this.log.i("GET[" + this.serviceUrl + "/count" + "]")),
        mergeMap(() =>
          this.http
            .createRequest()
            .url(this.serviceUrl + "/count")
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
        map(() => {
          if (isString(query)) {
            this.log.i("GET[" + this.serviceUrl + "/" + (query as SrQuery).toString() + "]");
          } else {
            this.log.i("GET[" + this.serviceUrl + "/" + (query as string) + "]");
          }
        }),
        mergeMap(() => {
          const req = this.http.createRequest();
          if (isNullOrUndefined(query)) {
            req.url(this.serviceUrl);
          } else if (isString(query)) {
            req.url(this.serviceUrl + "/" + (query as string));
          } else {
            req.url(this.serviceUrl)
              .setParams((query as SrQuery).build());
          }
          return req
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
            );
        })
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
