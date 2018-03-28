import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TextMaskModule} from "angular2-text-mask";

export * from "./sr-mask.util";


@NgModule({
  imports: [
    CommonModule,
    TextMaskModule
  ]
})

export class SrMaskModule {
}
