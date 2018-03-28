import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrHttpService} from "./services/sr-http.service";

export * from "./model/index";
export * from "./services/index";
export * from "./sr-criteria/index";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SrHttpService
  ],
  declarations: []
})
export class SrHttpModule {
}
