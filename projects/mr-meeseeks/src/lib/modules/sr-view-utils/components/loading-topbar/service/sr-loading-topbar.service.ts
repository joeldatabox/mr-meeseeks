import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {SrLoaderState} from "../model/sr-loading";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable({
  providedIn: "root"
})
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
