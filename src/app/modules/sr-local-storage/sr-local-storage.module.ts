import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrLocalStorageService} from "./services/sr-local-storage.service";

export * from "./services/sr-local-storage.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SrLocalStorageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SrLocalStorageModule,
      providers: [
        SrLocalStorageService
      ]
    };
  }
}
