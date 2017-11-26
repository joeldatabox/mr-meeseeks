import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {LoaderState} from "../model/loading";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class MrLoadingTopbarService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {
  }

  public show() {
    this.loaderSubject.next(<LoaderState>{show: true});
  }

  public hide() {
    this.loaderSubject.next(<LoaderState>{show: false});
  }
}
