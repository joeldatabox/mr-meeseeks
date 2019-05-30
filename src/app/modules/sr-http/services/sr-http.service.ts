import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SrMediaType} from "./sr-media-type";
import {Observable} from "rxjs";
import {isNotNullOrUndefined, SrLogg} from "../../sr-utils";

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

  public createRequest(): SrRequest {
    return new SrRequest(this.http);
  }

}

export class SrRequest {
  private _url: string;
  // @ts-ignore
  private _headers: Map<string, string>;
  private _log: SrLogg;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this._headers = new Map();
    this.acceptJsonOnly()
      .contentTypeJson();
  }

  public setHeader(key: string, value: string): SrRequest {
    this._headers.set(key, value);
    return this;
  }

  public appendHeader(key: string, value: string): SrRequest {
    this._headers.has(key) ? this._headers.set(key, this._headers.get(key) + ", " + value) : this._headers.set(key, value);
    return this;
  }

  public acceptJsonOnly(): SrRequest {
    this._headers.set("Accept", SrMediaType.APPLICATION_JSON_ANY);
    return this;
  }

  public acceptTextOnly(): SrRequest {
    this._headers.set("Accept", SrMediaType.TEXT_PLAIN);
    return this;
  }

  public contentTypeText(): SrRequest {
    this._headers.set("Content-Type", SrMediaType.TEXT_PLAIN);
    return this;
  }

  public contentTypeJson(): SrRequest {
    this._headers.set("Content-Type", SrMediaType.APPLICATION_JSON_UTF8);
    return this;
  }

  public url(url: string): SrRequest {
    this._url = url;
    return this;
  }

  public usingLog(log: SrLogg): SrRequest {
    this._log = log;
    return this;
  }

  public get(): Observable<any> {
    this.logURL("GET", this._url);
    return this.http.get(encodeURI(this._url), this.buildOptionsRequest());
  }

  public post(body?: any): Observable<any> {
    this.logURL("POST", this._url, body);
    return this.http
    // @ts-ignore
      .post(encodeURI(this._url), body, this.buildOptionsRequest());
  }

  public put(body?: any): Observable<any> {
    this.logURL("PUT", this._url, body);
    return this.http
    // @ts-ignore
      .put(encodeURI(this._url), body, this.buildOptionsRequest());
  }

  public delete(): Observable<any> {
    this.logURL("DELETE", this._url);
    return this.http
      .delete(encodeURI(this._url), this.buildOptionsRequest());
  }

  private buildOptionsRequest() {
    let headers = new HttpHeaders();
    this._headers.forEach((value, key) => {
      headers = headers.append(key, value);
    });
    return {headers: headers};
  }

  private logURL(type: "GET" | "PUT" | "DELETE" | "POST", url: string, payload?: any): void {
    if (isNotNullOrUndefined(this._log)) {
      this._log.i(type + "[" + url + "]", payload);
    }
  }
}
