import {Injectable} from "@angular/core";
import {SrLoadingTopbarService} from "../../components/loading-topbar/service/sr-loading-topbar.service";
import {TdLoadingService} from "@covalent/core/loading";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable({
  providedIn: "root"
})
export class SrLoadingService {
  private itensRegistered: Set<string>;

  constructor(private tdLoading: TdLoadingService, private loadingTopBar: SrLoadingTopbarService) {
    this.itensRegistered = new Set();
  }

  register(name?: string, registers?: number): boolean {
    if (!this.itensRegistered.has(name)) {
      this.itensRegistered.add(name);
      return this.tdLoading.register(name, registers);
    }
    return true;
  }

  timeOut(resolve: string, time?: number | 2000): void {
    if (this.itensRegistered.has(resolve)) {
      setTimeout(() => {
        this.tdLoading.resolve(resolve);
      }, time);
      this.itensRegistered.delete(resolve);
    }
  }

  showTopBar(): void {
    this.loadingTopBar.show();
  }

  hideTopBar(): void {
    this.loadingTopBar.hide();
  }
}
