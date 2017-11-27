import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrMetaService} from "./services/meta/sr-meta.service";
import {SrSnackService} from "./services/snack/sr-snack.service";
import {MatDialogModule, MatProgressBarModule, MatSnackBarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SrDialogService} from "./services/dialog/sr-dialog.service";
import {CovalentDialogsModule, CovalentLoadingModule} from "@covalent/core";
import {SrLoadingTopbarComponent} from "./components/loading-topbar/component/sr-loading-topbar.component";
import {SrLoadingService} from "./services/loading/sr-loading.service";
import {SrLoadingTopbarService} from "./components/loading-topbar/service/sr-loading-topbar.service";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    CovalentDialogsModule,
    CovalentLoadingModule
  ],
  declarations: [
    SrLoadingTopbarComponent
  ],
  exports: [
    SrLoadingTopbarComponent
  ],
  providers: [
    SrMetaService,
    SrSnackService,
    SrDialogService,
    SrLoadingService,
    SrLoadingTopbarService
  ]
})
export class SrViewUtilsModule {
}
