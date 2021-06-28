import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {HttpObserve, SrMediaType, ResponseType} from "./sr-media-type";
import {Observable} from "rxjs";
import {isNotNullOrUndefined, isNullOrUndefined, isString} from "../../sr-utils/commons/sr-commons.model";
import {SrLogg} from "../../sr-utils/logger/sr-logger";
import {Model} from "./../model";
import moment from "moment-es6";

const DATE_TIME_PATTERN = "YYYY-MM-DDTHH:mm:ss.SSSZZ";
const DATE_PATTERN = "YYYY-MM-DD";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable({
  providedIn: "root"
})
export class SrHttpService {

  constructor(private http: HttpClient) {
  }

  public createRequest(): Request {
    return new Request(this.http);
  }

}

export class Request {
  private _url: string;
  // @ts-ignore
  private _headers: HttpHeaders;
  private _responseType: string;
  private _params: HttpParams;
  private _log: SrLogg;
  private _observer: HttpObserve;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this._headers = new HttpHeaders();
    this._params = new HttpParams();
  }

  public setHeader(key: string, value: string | string[]): Request {
    this._headers = this._headers.set(key, value);
    return this;
  }

  public appendHeader(key: string, value: string | string[]): Request {
    this._headers = this._headers.append(key, value);
    return this;
  }

  public acceptJsonOnly(): Request {
    this._headers = this._headers.set("Accept", SrMediaType.APPLICATION_JSON_ANY);
    if (isNullOrUndefined(this._responseType)) {
      this.responseType(ResponseType.JSON);
    }
    return this;
  }

  public acceptPDFOnly(): Request {
    this._headers = this._headers.set("Accept", SrMediaType.APPLICATION_PDF);
    if (isNullOrUndefined(this._responseType)) {
      this.responseType(ResponseType.BLOB);
    }
    return this;
  }

  public acceptTextOnly(): Request {
    this._headers = this._headers.set("Accept", SrMediaType.TEXT_PLAIN);
    if (isNullOrUndefined(this._responseType)) {
      this.responseType(ResponseType.TEXT);
    }
    return this;
  }

  public contentTypeText(): Request {
    this._headers = this._headers.set("Content-Type", SrMediaType.TEXT_PLAIN);
    return this;
  }

  public contentTypeJson(): Request {
    this._headers = this._headers.set("Content-Type", SrMediaType.APPLICATION_JSON_UTF8);
    return this;
  }

  public responseType(value: ResponseType | string): Request {
    this._responseType = value;
    return this;
  }

  public observe(observe: HttpObserve): Request {
    this._observer = observe;
    return this;
  }

  public setParams(key: string, value: string): Request {
    this._params = this._params.set(key, value);
    return this;
  }

  public appendParam(key: string, value: string | Model): Request {
    if (isNullOrUndefined(value)) {
      this._params = this._params.append(key, value as any);
    } else if (isString(value)) {
      this._params = this._params.append(key, value as string);
    } else {
      this._params = this._params.append(key, (value as Model).id);
    }
    return this;
  }

  public appendParamIfNotNullOrUndefined(key: string, value: string | Model): Request {
    if (isNotNullOrUndefined(value)) {
      this.appendParam(key, value);
    }
    return this;
  }

  public appendParamDate(key: string, value: Date, pattern?: string): Request {
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_PATTERN;
    }

    if (isNotNullOrUndefined(value)) {
      this.appendParam(key, moment(value).format(pattern));
    } else {
      this.appendParam(key, value as any);
    }
    return this;
  }

  public appendParamDateIfNotNullOrUndefined(key: string, value: Date): Request {
    if (isNotNullOrUndefined(value)) {
      this.appendParamDate(key, value);
    }
    return this;
  }

  public appendParamDateTime(key: string, value: Date, pattern?: string): Request {
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_TIME_PATTERN;
    }

    if (isNotNullOrUndefined(value)) {
      this.appendParam(key, moment(value).format(pattern));
    } else {
      this.appendParam(key, value as any);
    }

    return this;
  }

  public appendParamDateTimeIfNotNullOrUndefined(key: string, value: Date): Request {
    if (isNotNullOrUndefined(value)) {
      this.appendParamDateTime(key, value);
    }
    return this;
  }

  public url(url: string): Request {
    this._url = url;
    return this;
  }

  public usingLog(log: SrLogg): Request {
    this._log = log;
    return this;
  }

  public get(): Observable<any> {
    this.logURL("GET", this._url);
    return this.http.get(encodeURI(this._url), this.buildOptionsRequest("get"));
  }

  public post(body?: any): Observable<any> {
    this.logURL("POST", this._url, body);
    return this.http
      // @ts-ignore
      .post(encodeURI(this._url), body, this.buildOptionsRequest("post"));
  }

  public put(body?: any): Observable<any> {
    this.logURL("PUT", this._url, body);
    return this.http
      // @ts-ignore
      .put(encodeURI(this._url), body, this.buildOptionsRequest("put"));
  }

  public delete(): Observable<any> {
    this.logURL("DELETE", this._url);
    return this.http
      .delete(encodeURI(this._url), this.buildOptionsRequest("delete"));
  }

  private buildOptionsRequest(type: "get" | "post" | "put" | "delete"): any {
    if (!this._headers.has("Accept")) {
      this.acceptJsonOnly();
    }
    if (type === "post" || type === "put") {
      if (!this._headers.has("Content-Type")) {
        this.contentTypeJson();
      }
    }
    return {
      headers: this._headers,
      params: this._params,
      reportProgress: undefined,
      responseType: this._responseType as string,
      observe: this._observer,
      withCredentials: undefined
    };
  }

  private logURL(type: "GET" | "PUT" | "DELETE" | "POST", url: string, payload?: any): void {
    if (isNotNullOrUndefined(this._log)) {
      if (this._params.keys().length > 0) {
        this._log.i(type + "[" + url + "?" + this._params.toString() + "]", payload);
      } else {
        this._log.i(type + "[" + url + "]", payload);
      }
    }
  }
}
