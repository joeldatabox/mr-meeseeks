import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SrQueryParamUtilsService} from "./services/sr-query-param-utils.service";

export * from "./services/sr-query-param-utils.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: []
})
export class SrRouteUtilsModule {
  static forRoot(): ModuleWithProviders<SrRouteUtilsModule> {
    return {
      ngModule: SrRouteUtilsModule,
      providers: [
        SrQueryParamUtilsService
      ]
    };
  }
}
