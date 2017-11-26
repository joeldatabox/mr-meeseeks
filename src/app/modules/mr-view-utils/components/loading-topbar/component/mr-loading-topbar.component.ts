import {Component, OnDestroy, OnInit} from "@angular/core";
import {MrLoadingTopbarService} from "../service/mr-loading-topbar.service";
import {Subscription} from "rxjs/Subscription";
import {LoaderState} from "../model/loading";

@Component({
  selector: "mr-loading-topbar",
  templateUrl: "./mr-loading-topbar.component.html",
  styleUrls: ["./mr-loading-topbar.component.css"]
})
export class MrLoadingTopbarComponent implements OnInit, OnDestroy {

  show: boolean = false;
  private subscription: Subscription;

  constructor(private loadingService: MrLoadingTopbarService) {
  }

  ngOnInit() {
    this.subscription = this.loadingService
      .loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
