import {ChartColor} from "../model/chart-color.model";
import {CanvasGradientBuilder} from "../model/canvas-gradient.model";

export class ChartColorsUtil {

  constructor() {
  }

  newColor(): ChartColor {
    return new ChartColor();
  }

  createGradient(): CanvasGradientBuilder {
    return new CanvasGradientBuilder();
  }
}
