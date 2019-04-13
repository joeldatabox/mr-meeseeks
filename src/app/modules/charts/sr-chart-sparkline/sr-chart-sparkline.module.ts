import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SrChartSparklineComponent} from "./components/sr-chart-sparkline/sr-chart-sparkline.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SrChartSparklineComponent
  ],
  exports: [
    SrChartSparklineComponent
  ]
})
export class SrChartSparklineModule {
}

export * from "./model/sparkline-data-model.model";
