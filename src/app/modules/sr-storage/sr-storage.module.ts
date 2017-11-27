import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrLocalStorageService} from "./services/sr-local-storage.service";

@NgModule({
  imports: [
    CommonModule,
    SrLocalStorageService
  ],
  providers: [
    SrLocalStorageService
  ],
  declarations: []
})
export class SrStorageModule {
}
