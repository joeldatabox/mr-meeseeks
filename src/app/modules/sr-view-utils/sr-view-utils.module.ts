import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatDialogModule, MatProgressBarModule} from "@angular/material";
import {CovalentDialogsModule, CovalentLoadingModule} from "@covalent/core";
import {SrLoadingTopbarComponent} from "./components/loading-topbar/component/sr-loading-topbar.component";
import {SrMetaService} from "./services/meta/sr-meta.service";
import {SrDialogService} from "./services/dialog/sr-dialog.service";
import {SrLoadingService} from "./services/loading/sr-loading.service";
import {SrLoadingTopbarService} from "./components/loading-topbar/service";
import {SrViewInjectorService} from "./services/view-injector/sr-view-injector.service";

export * from "./components/index";

export * from "./services/dialog/sr-dialog.service";
export * from "./services/loading/sr-loading.service";
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
    CovalentDialogsModule,
    CovalentLoadingModule
  ],
  declarations: [
    SrLoadingTopbarComponent
  ],
  exports: [
    SrLoadingTopbarComponent,
    CovalentLoadingModule,
    CovalentDialogsModule
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SrViewUtilsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SrViewUtilsModule,
      providers: [
        SrMetaService,
        SrDialogService,
        SrLoadingService,
        SrLoadingTopbarService,
        SrViewInjectorService,
      ]
    };
  }
}
