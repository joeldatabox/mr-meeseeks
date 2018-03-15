import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrHttpService} from "./services/sr-http.service";
//é necessário para o funcionamento do class-transformer
//import "reflect-metadata";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SrHttpService
  ],
  declarations: []
})
export class SrHttpModule {
}
