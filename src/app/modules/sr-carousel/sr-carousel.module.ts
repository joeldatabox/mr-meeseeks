import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrCarouselComponent} from "./components/sr-carousel/sr-carousel.component";
import {SrCarouselSlideComponent} from "./components/sr-carousel-slide/sr-carousel-slide.component";
import {MatButtonModule, MatIconModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    SrCarouselComponent,
    SrCarouselSlideComponent
  ],
  exports: [
    SrCarouselComponent,
    SrCarouselSlideComponent
  ]
})
export class SrCarouselModule {
}
