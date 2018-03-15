import {SrHttpService} from "./sr-http.service";
import {SrQuery} from "../sr-criteria";
import {isNotNullOrUndefined, isNullOrUndefined, isString, SrLogg} from "../../sr-utils";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/expand";
import "rxjs/add/observable/of";
import "rxjs/add/operator/takeWhile";
import {deserialize, plainToClass, serialize} from "class-transformer";
import {Model} from "../model/model";
import {ListResource} from "../model/list-resource.model";
import {MetaData} from "../model/metadata.model";
import {throwErrorMessage} from "../model";
import {ModelService} from "./model-service.interface";

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
    const payload = serialize(value);
    this.log.i("POST[" + this.buildServiceUrl() + "]", JSON.parse(payload));
    return this.http
      .createRequest()
      .url(this.buildServiceUrl())
      .post(payload)
      //pelo fato de ser um poste não se tem necessidade de se pegar a resposta
      //.map((res: Response) => res.json())
      .catch((err) => throwErrorMessage(err, this.log));
  }

  update(value: T): Observable<T> {
    const payload = serialize(value);
    this.log.i("PUT[" + this.buildServiceUrl() + "/" + value.id + "]", JSON.parse(payload));
    return this.http
      .createRequest()
      .url(this.buildServiceUrl() + "/" + value.id)
      .put(payload)
      .map((result) => deserialize(this.clazz, JSON.stringify(result)))
      .catch((err) => throwErrorMessage(err, this.log));
  }

  findById(id: any): Observable<T> {
    this.log.i("GET[" + this.buildServiceUrl() + "/" + id + "]");
    return this.http
      .createRequest()
      .url(this.buildServiceUrl() + "/" + id)
      .get()
      .map((result) => JSON.stringify(result))
      .map((value: any) => deserialize(this.clazz, value))
      .catch((err) => throwErrorMessage(err, this.log));
  }

  first(): Observable<T> {
    this.log.i("GET[" + this.buildServiceUrl() + "/first]");
    return this
      .http.createRequest()
      .url(this.buildServiceUrl() + "/first")
      .get()
      .map((result) => JSON.stringify(result))
      .map((value: any) => deserialize(this.clazz, value))
      .catch((err) => throwErrorMessage(err, this.log));
  }

  delete(value: T): Observable<T> {
    this.log.i("DELETE[" + this.buildServiceUrl() + "/" + value.id + "]", JSON.parse(serialize(value)));
    return this.http.createRequest().url(this.buildServiceUrl() + "/" + value.id)
      .delete()
      //.map((res: Response) => res.json())
      .catch((err) => throwErrorMessage(err, this.log));
  }

  count(): Observable<number> {
    this.log.i("GET[" + this.buildServiceUrl() + "/count" + "]");
    return this.http
      .createRequest()
      .url(this.buildServiceUrl() + "/count")
      .acceptTextOnly()
      .get()
      .map((value: string) => Number(value))
      .catch((err) => throwErrorMessage(err, this.log));
  }

  list(query?: SrQuery | string): Observable<ListResource<T>> {
    const url = isString(query) ? query as string : this.buildServiceUrl(query as SrQuery);

    this.log.i("GET[" + url + "]");
    return this.http
      .createRequest()
      .url(url)
      .get()
      .map((result) => {
        const list = new ListResource<T>();
        if (isNotNullOrUndefined(result)) {
          list.records = <Array<T>>plainToClass(this.clazz, result.records);
          list._metadata = deserialize(MetaData, JSON.stringify(result._metadata));
          this.log.d("payload", list);
        }
        return list;
      })
      .catch((err) => throwErrorMessage(err, this.log));
  }

  listAll(query?: SrQuery | string): Observable<ListResource<T>> {
    return this.list(query)
      .expand((list: ListResource<T>) => list.hasNextPage() ? this.list(list._metadata.nextPage()) : Observable.of(null))
      //devemos continuar o processo enquanto temos um list populado
      .takeWhile((list: ListResource<T>) => {
        return isNotNullOrUndefined(list) && !list.isEmpty();
      });
  }

  protected get labelLog(): string {
    return "AbstractRestService<T>";
  }

}
