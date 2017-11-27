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
  private loaderSubject = new Subject<SrLoaderState>();
  loaderState: Observable<SrLoaderState> = this.loaderSubject.asObservable();

  constructor() {
  }

  public show() {
    this.loaderSubject.next(<SrLoaderState>{show: true});
  }

  public hide() {
    this.loaderSubject.next(<SrLoaderState>{show: false});
  }
}
