import {Color} from "./color.model";
import {GradientColor} from "./gradient-color.model";
import {isString} from "../../sr-utils";

export class CanvasGradientBuilder {
    private colors: Array<GradientColor> = new Array<GradientColor>();

    addColorStop(offset: number, color: Color | string) {
        const value = new GradientColor();

        if (isString(color)) {
            value.color = new Color(color as string);
        } else {
            value.color = color as Color;
        }
        value.offset = offset;
        this.colors.push(value);
    }

    toNativeValue(context: CanvasRenderingContext2D): CanvasGradient {
        const gradient = context.createLinearGradient(0, 0, 0, 100);
        this.colors.forEach(c => c.toNativeValue(gradient));
        return gradient;
    }
}

