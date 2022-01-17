import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrHttpService} from "./services/sr-http.service";
import {HttpClientModule} from "@angular/common/http";

export * from "./model/index";
export * from "./services/index";
export * from "./sr-criteria/index";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [
    HttpClientModule
  ]
})
export class SrHttpModule {
  static forRoot(): ModuleWithProviders<SrHttpModule> {
    return {
      ngModule: SrHttpModule,
      providers: [
        SrHttpService
      ]
    };
  }
}
