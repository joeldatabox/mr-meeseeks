import {Injectable} from "@angular/core";
import {TdLoadingService} from "@covalent/core";
import {SrLoadingTopbarService} from "../../components/loading-topbar/service/sr-loading-topbar.service";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class SrLoadingService {

  constructor(private tdLoading: TdLoadingService, private loadingTopBar: SrLoadingTopbarService) {
  }

  register(name?: string, registers?: number): boolean {
    return this.tdLoading.register(name, registers);
  }

  timeOut(resolve: string, time?: number | 2000): void {
    setTimeout(() => {
      this.tdLoading.resolve(resolve);
    }, time);
  }

  showTopBar(): void {
    this.loadingTopBar.show();
  }

  hideTopBar(): void {
    this.loadingTopBar.hide();
  }
}
