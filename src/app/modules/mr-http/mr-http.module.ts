import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {MrHttpService} from "./services/mr-http.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    MrHttpService
  ],
  declarations: []
})
export class MrHttpModule {
}
