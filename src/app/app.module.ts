import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";


import {AppComponent} from "./app.component";
import {MrHttpModule} from "./modules/mr-http/mr-http.module";
import {MrStorageModule} from "./modules/mr-storage/mr-storage.module";
import {MrViewUtilsModule} from "./modules/mr-view-utils/mr-view-utils.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MrHttpModule,
    MrStorageModule,
    MrViewUtilsModule
  ],
  exports: [
    MrHttpModule,
    MrStorageModule,
    MrViewUtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
