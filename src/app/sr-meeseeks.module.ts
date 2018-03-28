import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SrHttpModule} from "./modules/sr-http/sr-http.module";
import {SrLocalStorageModule} from "./modules/sr-local-storage/sr-local-storage.module";
import {SrViewUtilsModule} from "./modules/sr-view-utils/sr-view-utils.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    SrHttpModule,
    SrLocalStorageModule,
    SrViewUtilsModule
  ],
  exports: [
    SrHttpModule,
    SrLocalStorageModule,
    SrViewUtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SrMeeseeksModule {
}
