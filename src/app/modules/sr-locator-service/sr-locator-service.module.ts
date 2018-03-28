import {Injector, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrLocatorService} from "./services/sr-locator.service";

export * from "./services/sr-locator.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SrLocatorServiceModule {

  constructor(private injector: Injector) {
    SrLocatorService.injector = this.injector;
  }
}

