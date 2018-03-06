import {SrHttpService} from "./sr-http.service";
import {SrQuery} from "../sr-criteria";
import {isNotNullOrUndefined, isNullOrUndefined, SrLogg} from "../../sr-utils";
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

export abstract class SrAbstractRestService<T extends Model> {
  protected readonly log: SrLogg = SrLogg.of(this.labelLog);

  constructor(protected clazz: any, protected http: SrHttpService) {
  }

  protected abstract get serviceUrl(): string;

  protected buildServiceUrl(query?: SrQuery) {
    if (isNullOrUndefined(query)) {
      return this.serviceUrl;
    }
    return this.serviceUrl + query.build();
  }

  save(value: T): Observable<T> {
    const payload = serialize(value);
    this.log.i("POST[" + this.buildServiceUrl() + "]", JSON.parse(payload));
    return this.http.createRequest()
      .url(this.buildServiceUrl())
      .post(payload)
      .catch(err => this.exceptionHandler(err));
  }

  update(value: T): Observable<T> {
    const payload = serialize(value);
    this.log.i("PUT[" + this.buildServiceUrl() + "/" + value.id + "]", JSON.parse(payload));
    return this.http.createRequest()
      .url(this.buildServiceUrl() + "/" + value.id)
      .put(payload)
      .map(res => deserialize(this.clazz, JSON.stringify(res)))
      .catch((error) => this.exceptionHandler(error));
  }

  findById(id: any): Observable<T> {
    this.log.i("GET[" + this.buildServiceUrl() + "/" + id + "]");
    return this.http.createRequest()
      .url(this.buildServiceUrl() + "/" + id)
      .get()
      .map(value => deserialize(this.clazz, JSON.stringify(value)))
      .catch((error) => this.exceptionHandler(error));
  }

  delete(value: T): Observable<void> {
    this.log.i("DELETE[" + this.buildServiceUrl() + "/" + value.id + "]", JSON.parse(serialize(value)));
    return this.http.createRequest()
      .url(this.buildServiceUrl() + "/" + value.id)
      .delete()
      .catch((error) => this.exceptionHandler(error));
  }

  count(): Observable<number> {
    this.log.i("GET[" + this.buildServiceUrl() + "/count" + "]");
    return this.http.createRequest()
      .url(this.buildServiceUrl() + "/count")
      .acceptTextOnly()
      .get()
      .map(value => Number(JSON.stringify(value)))
      .catch((error) => this.exceptionHandler(error));
  }

  list(query?: SrQuery | string): Observable<ListResource<T>> {
    let url = "";
    if (query && typeof query === "string") {
      url = query;
    } else {
      url = this.buildServiceUrl(query as SrQuery);
    }
    this.log.i("GET[" + url + "]");
    return this.http.createRequest()
      .url(url)
      .get()
      .map(res => {
        const list = new ListResource<T>();
        if (isNotNullOrUndefined(res)) {
          list.records = <Array<T>>plainToClass(this.clazz, res.records);
          list._metadata = deserialize(MetaData, JSON.stringify(res._metadata));
          this.log.d("payload", list);
        }
        return list;
      })
      .catch((error) => this.exceptionHandler(error));
  }

  listAll(query?: SrQuery | string): Observable<ListResource<T>> {
    return this.list(query)
      .expand((list: ListResource<T>) => {
        if (list.hasNextPage()) {
          return this.list(list._metadata.nextPage());
        } else {
          return Observable.of(new ListResource());
        }
      })
      //devemos continuar o processo enquanto temos um list populado
      .takeWhile((list: ListResource<T>) => {
        return !list.isEmpty();
      });
  }

  protected get labelLog(): string {
    return "AbstractRestService<T>";
  }

  protected exceptionHandler(error: any): Observable<any> {
    this.log.e("error ocurred", error);
    return Observable.throw(error);
  }
}
