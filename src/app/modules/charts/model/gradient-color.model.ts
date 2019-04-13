import {Color} from "./color.model";
import {Error} from "tslint/lib/error";
import {isNullOrUndefined} from "../../sr-utils";

export class GradientColor {
    offset: number;
    color: Color;

    toNativeValue(canvas: CanvasGradient): void {
        if (isNullOrUndefined(this.offset) || isNullOrUndefined(this.color)) {
            throw new Error("informe algum valor válido para offset e color");
        }
        canvas.addColorStop(this.offset, this.color.toNativeValue());
    }
}
