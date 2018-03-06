import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {SrLoaderState} from "../model/sr-loading";
import {Observable} from "rxjs/Observable";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class SrLoadingTopbarService {
  private loaderSubject;
  loaderState: Observable<SrLoaderState>;

  constructor() {
    this.loaderSubject = new Subject<SrLoaderState>();
    this.loaderState = this.loaderSubject.asObservable();
  }

  public show() {
    this.loaderSubject.next({show: true});
  }

  public hide() {
    this.loaderSubject.next({show: false});
  }
}
