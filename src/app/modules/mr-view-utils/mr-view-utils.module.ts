import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MrMetaService} from "./services/meta/mr-meta.service";
import {MrSnackService} from "./services/snack/mr-snack.service";
import {MatDialogModule, MatProgressBarModule, MatSnackBarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MrDialogService} from "./services/dialog/mr-dialog.service";
import {CovalentDialogsModule, CovalentLoadingModule} from "@covalent/core";
import {MrLoadingTopbarComponent} from "./components/loading-topbar/component/mr-loading-topbar.component";
import {MrLoadingService} from "./services/loading/mr-loading.service";
import {MrLoadingTopbarService} from "./components/loading-topbar/service/mr-loading-topbar.service";

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
    MrLoadingTopbarComponent
  ],
  exports: [
    MrLoadingTopbarComponent
  ],
  providers: [
    MrMetaService,
    MrSnackService,
    MrDialogService,
    MrLoadingService,
    MrLoadingTopbarService
  ]
})
export class MrViewUtilsModule {
}
