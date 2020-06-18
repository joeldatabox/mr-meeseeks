import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SrHttpModule} from "./modules/sr-http/sr-http.module";
import {SrLocalStorageModule} from "./modules/sr-local-storage/sr-local-storage.module";
import {SrViewUtilsModule} from "./modules/sr-view-utils/sr-view-utils.module";
import {CommonModule} from "@angular/common";
import {SrAutoCompleteDirectiveModule} from "./modules/sr-auto-complete-directive/sr-auto-complete-directive.module";
import {SrLocatorServiceModule} from "./modules/sr-locator-service";
import {SrMaskModule} from "./modules/sr-mask";
import {SrValidatorModule} from "./modules/sr-validator";
import {SrCarouselModule} from "./modules/sr-carousel/sr-carousel.module";
import { HammerModule } from "@angular/platform-browser";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    SrAutoCompleteDirectiveModule,
    SrCarouselModule,
    SrHttpModule,
    SrLocalStorageModule,
    SrLocatorServiceModule,
    SrMaskModule,
    SrValidatorModule,
    SrViewUtilsModule,
    HammerModule
  ],
  exports: [
    SrAutoCompleteDirectiveModule,
    SrCarouselModule,
    SrHttpModule,
    SrLocalStorageModule,
    SrLocatorServiceModule,
    SrMaskModule,
    SrValidatorModule,
    SrViewUtilsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SrMeeseeksModule {
}
