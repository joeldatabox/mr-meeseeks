import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {SrHttpService} from "./services/sr-http.service";

export * from "./services/sr-http.service";
export * from "./services/sr-media-type";
export * from "./sr-criteria";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SrHttpService
  ],
  declarations: []
})
export class SrHttpModule {
}
