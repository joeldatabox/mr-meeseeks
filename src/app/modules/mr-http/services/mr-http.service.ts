import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MediaType} from "./mr-media-type";
import {Observable} from "rxjs/Observable";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class MrHttpService {

  constructor(private http: HttpClient) {
  }

  public createRequest(): Request {
    return new Request(this.http);
  }

}

export class Request {
  private _url: string;
  private _headers: Map<string, string>;

  constructor(private http: HttpClient) {
    this._headers = new Map();
    this.acceptJsonOnly()
      .contentTypeJson();
  }

  public setHeader(key: string, value: string): Request {
    this._headers.set(key, value);
    return this;
  }

  public appendHeader(key: string, value: string): Request {
    this._headers.has(key) ? this._headers.set(key, this._headers.get(key) + ", " + value) : this._headers.set(key, value);
    return this;
  }

  public acceptJsonOnly(): Request {
    this._headers.set("Accept", MediaType.APPLICATION_JSON_ANY);
    return this;
  }

  public acceptTextOnly(): Request {
    this._headers.set("Accept", MediaType.TEXT_PLAIN);
    return this;
  }

  public contentTypeText(): Request {
    this._headers.set("Content-Type", MediaType.TEXT_PLAIN);
    return this;
  }

  public contentTypeJson(): Request {
    this._headers.set("Content-Type", MediaType.APPLICATION_JSON_UTF8);
    return this;
  }

  public url(url: string): Request {
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
