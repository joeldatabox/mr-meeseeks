import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SrLoadingTopbarComponent} from "./components/loading-topbar/component/sr-loading-topbar.component";
import {SrMetaService} from "./services/meta/sr-meta.service";
import {SrLoadingTopbarService} from "./components/loading-topbar/service/sr-loading-topbar.service";
import {SrViewInjectorService} from "./services/view-injector/sr-view-injector.service";
import {SrAutoTabDirective} from "./directives/sr-auto-tab.directive";
import {SrRouteUtilsModule} from "../sr-route-utils/sr-route-utils.module";

export * from "./components/loading-topbar/component/sr-loading-topbar.component";
export * from "./components/loading-topbar/model/sr-loading";
export * from "./components/loading-topbar/service/sr-loading-topbar.service";

export * from "./directives/sr-auto-tab.directive";

export * from "./obs/sr-distinct-until-changed";


export * from "./services/meta/sr-meta.service";
export * from "./services/view-injector/sr-view-injector.service";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressBarModule,
    SrRouteUtilsModule.forRoot()
  ],
  declarations: [
    SrLoadingTopbarComponent,
    SrAutoTabDirective
  ],
  exports: [
    SrLoadingTopbarComponent,
    SrAutoTabDirective
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SrViewUtilsModule {
  static forRoot(): ModuleWithProviders<SrViewUtilsModule> {
    return {
      ngModule: SrViewUtilsModule,
      providers: [
        SrMetaService,
        SrLoadingTopbarService,
        SrViewInjectorService,
      ]
    };
  }
}
