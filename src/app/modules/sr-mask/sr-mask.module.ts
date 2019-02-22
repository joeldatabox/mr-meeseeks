import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TextMaskModule} from "angular2-text-mask";
import {SrMaskService} from "./services/sr-mask.service";
import {SrDateMaskDirective} from "./directives/sr-date-mask.directive";

export * from "./sr-mask.util";
export * from "./services/sr-mask.service";


@NgModule({
  imports: [
    CommonModule,
    TextMaskModule
  ],
  declarations: [
    SrDateMaskDirective
  ],
  exports: [
    TextMaskModule,
    SrDateMaskDirective
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
