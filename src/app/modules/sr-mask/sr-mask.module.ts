import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TextMaskModule} from "angular2-text-mask";
import {SrMaskUtil} from "./sr-mask.util";


@NgModule({
  imports: [
    CommonModule,
    TextMaskModule
  ],
  exports: [TextMaskModule, SrMaskUtil]
})

export class SrMaskModule {
}
