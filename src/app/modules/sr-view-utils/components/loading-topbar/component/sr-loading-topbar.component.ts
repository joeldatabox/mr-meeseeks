import {Component, OnDestroy, OnInit} from "@angular/core";
import {SrLoadingTopbarService} from "../service/sr-loading-topbar.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: "sr-loading-topbar",
  templateUrl: "./sr-loading-topbar.component.html",
  styleUrls: ["./sr-loading-topbar.component.css"]
})
export class SrLoadingTopbarComponent implements OnInit, OnDestroy {

  show = false;
  private subscription: Subscription;

  constructor(private loadingService: SrLoadingTopbarService) {
  }

  ngOnInit() {
    this.subscription = this.loadingService
      .loaderState
      .subscribe(state => {
        this.show = state.show;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
