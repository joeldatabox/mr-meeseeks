import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from "@angular/core";
import {SrSparklineDataSet} from "../../model/sparkline-data-model.model";
import {ChartColor} from "../../../model/chart-color.model";
import {Chart} from "chart.js";
import {isNullOrUndefined, isNumber} from "../../../../sr-utils";

@Component({
  selector: "sr-chart-sparkline",
  templateUrl: "./sr-chart-sparkline.component.html",
  styleUrls: ["./sr-chart-sparkline.component.scss"]
})
export class SrChartSparklineComponent implements OnInit {

  private _style = {};
  contextEvent: EventEmitter<CanvasRenderingContext2D>;
  chartOption: any;

  @Input()
  dataset: SrSparklineDataSet;

  private _context2D: CanvasRenderingContext2D;

  @ViewChild("sparklineCanvas", {read: ElementRef, static: true})
  sparklineCanvas: ElementRef;

  @Input("width")
  width: any;

  @Input("height")
  height: any;


  @Input()
  color: ChartColor;

  @Output()
  get context2D(): EventEmitter<CanvasRenderingContext2D> {
    return this.contextEvent;
  }

  chart = [];

  constructor(private elementRef: ElementRef, private rederer: Renderer2) {
    this.chartOption = {
      responsive: true,
      maintainAspectRatio: false,
      /*animation: {
          duration: 1000,
          xAxis: true,
          yAxis: true,
      },*/
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      tooltips: {
        enabled: false
      },
      elements: {
        point: {
          radius: 0
        },
        line: {
          tension: 0
        }
      },
      legend: {
        display: false
      }
    };
    this.contextEvent = new EventEmitter<CanvasRenderingContext2D>();
  }

  ngOnInit() {
    //setando o tamanho na div
    const width = isNumber(this.width) ? this.width + "px" : this.width;
    const height = isNumber(this.height) ? this.height + "px" : this.height;
    const div = this.elementRef.nativeElement.children[0];
    //forçando a atualização da div
    this.rederer.setStyle(div, "width", width);
    this.rederer.setStyle(div, "height", height);
    this.rederer.setStyle(div, "display", "block");
    //forçando a atualização do canvas
    this.rederer.setStyle(this.sparklineCanvas.nativeElement, "width", width);
    this.rederer.setStyle(this.sparklineCanvas.nativeElement, "height", height);
    this.rederer.setStyle(this.sparklineCanvas.nativeElement, "display", "block");

    this._style = {display: "block"};
    this._style["width"] = width;
    this._style["height"] = height;

    const context = (<HTMLCanvasElement>this.sparklineCanvas.nativeElement).getContext("2d");
    const gradient2 = context.createLinearGradient(0, 0, 0, 100);
    gradient2.addColorStop(0.1, "rgba(123, 79, 25, 0.9)");
    gradient2.addColorStop(0.3, "rgba(68, 138, 255, 0.08)");
    gradient2.addColorStop(0.6, "rgba(0, 188, 212, 0.01)");
    gradient2.addColorStop(1, "rgba(0, 188, 212, 0)");
    this.chart = new Chart(this._context2D = (<HTMLCanvasElement>this.sparklineCanvas.nativeElement).getContext("2d"), {
      type: "line",
      data: isNullOrUndefined(this.color) ? this.dataset.toNativeData(new ChartColor().toNativeColor(context)) : this.dataset.toNativeData(this.color.toNativeColor(context)),
      options: this.chartOption
    });
  }

  get style() {
    return this._style;
  }

}
