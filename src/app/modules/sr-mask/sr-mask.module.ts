import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TextMaskModule} from "angular2-text-mask";
import {SrMaskService} from "./services/sr-mask.service";

export * from "./sr-mask.util";


@NgModule({
  imports: [
    CommonModule,
    TextMaskModule
  ],
  exports: [
    TextMaskModule
  ]
})

export class SrMaskModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SrMaskModule,
      providers: [
        SrMaskService
      ]
    };
  }
}
