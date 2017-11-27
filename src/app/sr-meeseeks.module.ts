import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SrHttpModule} from "./modules/sr-http/sr-http.module";
import {SrStorageModule} from "./modules/sr-storage/sr-storage.module";
import {SrViewUtilsModule} from "./modules/sr-view-utils/sr-view-utils.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SrHttpModule,
    SrStorageModule,
    SrViewUtilsModule
  ],
  exports: [
    SrHttpModule,
    SrStorageModule,
    SrViewUtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SrMeeseeksModule {
}
