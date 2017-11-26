import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MrStorageService} from "./services/mr-storage.service";

@NgModule({
  imports: [
    CommonModule,
    MrStorageService
  ],
  providers: [
    MrStorageService
  ],
  declarations: []
})
export class MrStorageModule {
}
