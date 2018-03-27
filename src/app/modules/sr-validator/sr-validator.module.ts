import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrValidators} from "./sr-validators.util";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SrValidators]
})
export class SrValidatorModule {
}
