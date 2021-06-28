import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SrLocatorService} from "./services/sr-locator.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SrLocatorModule {
  constructor(private injector: Injector) {
    SrLocatorService.injector = this.injector;
  }
}
