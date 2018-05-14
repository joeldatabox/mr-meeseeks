import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SrMediaType} from "./sr-media-type";
import {Observable} from "rxjs";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class SrHttpService {

  constructor(private http: HttpClient) {
  }

  public createRequest(): SrRequest {
    return new SrRequest(this.http);
  }

}

export class SrRequest {
  private _url: string;
  private _headers: Map<string, string>;

  constructor(private http: HttpClient) {
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

  public get(): Observable<any> {
    return this.http.get(this._url, this.buildOptionsRequest());
  }

  public post(body?: any): Observable<any> {
    return this.http
      .post(this._url, body, this.buildOptionsRequest());
  }

  public put(body?: any): Observable<any> {
    return this.http
      .put(this._url, body, this.buildOptionsRequest());
  }

  public delete(): Observable<any> {
    return this.http
      .delete(this._url, this.buildOptionsRequest());
  }

  private buildOptionsRequest() {
    let headers = new HttpHeaders();
    this._headers.forEach((value, key) => {
      headers = headers.append(key, value);
    });
    return {headers: headers};
  }
}
