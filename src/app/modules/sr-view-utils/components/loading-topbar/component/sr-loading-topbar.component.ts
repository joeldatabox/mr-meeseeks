import {Component, forwardRef, OnDestroy, OnInit} from "@angular/core";
import {SrLoadingTopbarService} from "../service/sr-loading-topbar.service";
import {Subscription} from "rxjs/Subscription";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SrLoadingTopbarComponent),
    multi: true,
  }],
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
