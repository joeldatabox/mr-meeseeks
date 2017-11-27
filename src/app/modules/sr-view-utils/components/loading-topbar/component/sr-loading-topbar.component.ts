import {Component, OnDestroy, OnInit} from "@angular/core";
import {SrLoadingTopbarService} from "../service/sr-loading-topbar.service";
import {Subscription} from "rxjs/Subscription";
import {SrLoaderState} from "../model/sr-loading";

@Component({
  selector: "sr-loading-topbar",
  templateUrl: "./sr-loading-topbar.component.html",
  styleUrls: ["./sr-loading-topbar.component.css"]
})
export class SrLoadingTopbarComponent implements OnInit, OnDestroy {

  show: boolean = false;
  private subscription: Subscription;

  constructor(private loadingService: SrLoadingTopbarService) {
  }

  ngOnInit() {
    this.subscription = this.loadingService
      .loaderState
      .subscribe((state: SrLoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
