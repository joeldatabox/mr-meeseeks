import {Color} from "./color.model";
import {CanvasGradientBuilder} from "./canvas-gradient.model";
import {isArray, isNotNullOrUndefined} from "../../sr-utils";

export class ChartColor {
    private _backgroundColor: Color | Color[] | CanvasGradientBuilder;
    private _borderWidth: number | number[];
    private _borderColor: Color | Color[] | CanvasGradientBuilder;
    private _borderCapStyle: "butt" | "round" | "square";
    private _borderDash: number[];
    private _borderDashOffset: number;
    private _borderJoinStyle: string;
    private _pointBorderColor: Color | Color[] | CanvasGradientBuilder;
    private _pointBackgroundColor: Color | Color[] | CanvasGradientBuilder;
    private _pointBorderWidth: number | number[];
    private _pointRadius: number | number[];
    private _pointHoverRadius: number | number[];
    private _pointHitRadius: number | number[];
    private _pointHoverBackgroundColor: Color | Color[] | CanvasGradientBuilder;
    private _pointHoverBorderColor: Color | Color[] | CanvasGradientBuilder;
    private _pointHoverBorderWidth: number | number[];
    private _pointStyle: "circle" | "cross" | "crossRot" | "dash" | "line" | "rect" | "rectRounded" | "rectRot" | "star" | "triangle";
    private _hoverBackgroundColor: Color | Color[] | CanvasGradientBuilder;
    private _hoverBorderColor: Color | Color[] | CanvasGradientBuilder;
    private _hoverBorderWidth: number;


    setBackgroundColor(value: Color | Color[] | CanvasGradientBuilder): ChartColor {
        this._backgroundColor = value;
        return this;
    }

    setBorderWidth(value: number | number[]): ChartColor {
        this._borderWidth = value;
        return this;
    }

    setBorderColor(value: Color | Color[] | CanvasGradientBuilder): ChartColor {
        this._borderColor = value;
        return this;
    }

    setBorderCapStyle(value: "butt" | "round" | "square"): ChartColor {
        this._borderCapStyle = value;
        return this;
    }


    setBorderDash(value: number[]): ChartColor {
        this._borderDash = value;
        return this;
    }

    setBorderDashOffset(value: number): ChartColor {
        this._borderDashOffset = value;
        return this;
    }

    setBorderJoinStyle(value: string): ChartColor {
        this._borderJoinStyle = value;
        return this;
    }


    setHoverBackgroundColor(value: Color | Color[] | CanvasGradientBuilder): ChartColor {
        this._hoverBackgroundColor = value;
        return this;
    }

    setHoverBorderColor(value: Color | Color[] | CanvasGradientBuilder): ChartColor {
        this._hoverBorderColor = value;
        return this;
    }

    setHoverBorderWidth(value: number): ChartColor {
        this._hoverBorderWidth = value;
        return this;
    }

    setPointBackgroundColor(value: Color | Color[] | CanvasGradientBuilder): ChartColor {
        this._pointBackgroundColor = value;
        return this;
    }

    setPointBorderColor(value: Color | Color[] | CanvasGradientBuilder): ChartColor {
        this._pointBorderColor = value;
        return this;
    }

    setPointBorderWidth(value: number | number[]): ChartColor {
        this._pointBorderWidth = value;
        return this;
    }

    setPointHitRadius(value: number | number[]): ChartColor {
        this._pointHitRadius = value;
        return this;
    }

    setPointHoverBackgroundColor(value: Color | Color[] | CanvasGradientBuilder) {
        this._pointHoverBackgroundColor = value;
        return this;
    }

    setPointHoverBorderColor(value: Color | Color[] | CanvasGradientBuilder): ChartColor {
        this._pointHoverBorderColor = value;
        return this;
    }

    setPointHoverBorderWidth(value: number | number[]): ChartColor {
        this._pointHoverBorderWidth = value;
        return this;
    }

    setPointHoverRadius(value: number | number[]): ChartColor {
        this._pointHoverRadius = value;
        return this;
    }

    setPointRadius(value: number | number[]): ChartColor {
        this._pointRadius = value;
        return this;
    }

    setPointStyle(value: "circle" | "cross" | "crossRot" | "dash" | "line" | "rect" | "rectRounded" | "rectRot" | "star" | "triangle"): ChartColor {
        this._pointStyle = value;
        return this;
    }

    toNativeColor(context?: CanvasRenderingContext2D): any {
        const color = {};
        if (isNotNullOrUndefined(this._backgroundColor)) {
            /*if (isArray(this._backgroundColor)) {
                color["backgroundColor"] = (this._backgroundColo as Array<Color>)
                    .map(it => it.toNativeValue());
            } else if (this._backgroundColor instanceof Color) {
                color["backgroundColor"] = (this._backgroundColor as Color).toNativeValue();
            } else {
                color["backgroundColor"] = (this._backgroundColor as CanvasGradientBuilder).toNativeValue(canva);
            }*/
            this.validadeNative("backgroundColor", color, this._backgroundColor, context);
        }
        if (isNotNullOrUndefined(this._borderWidth)) {
            color["borderWidth"] = this._borderWidth;
            //this.validadeNative("borderWidth", color, this._borderWidth, canva);
        }
        if (isNotNullOrUndefined(this._borderColor)) {
            //color["borderColor"] = this._borderColor;
            this.validadeNative("borderColor", color, this._borderColor, context);
        }
        if (isNotNullOrUndefined(this._borderCapStyle)) {
            color["borderCapStyle"] = this._borderCapStyle;
            //this.validadeNative("borderCapStyle", color, this._borderCapStyle, canva);
        }
        if (isNotNullOrUndefined(this._borderDash)) {
            color["borderDash"] = this._borderDash;
        }
        if (isNotNullOrUndefined(this._borderDashOffset)) {
            color["borderDashOffset"] = this._borderDashOffset;
        }
        if (isNotNullOrUndefined(this._borderJoinStyle)) {
            color["borderJoinStyle"] = this._borderJoinStyle;
        }
        if (isNotNullOrUndefined(this._pointBorderColor)) {
            //color["pointBorderColor"] = this._pointBorderColor;
            this.validadeNative("pointBorderColor", color, this._pointBorderColor, context);
        }
        if (isNotNullOrUndefined(this._pointBackgroundColor)) {
            //color["pointBackgroundColor"] = this._pointBackgroundColor;
            this.validadeNative("pointBackgroundColor", color, this._pointBackgroundColor, context);
        }
        if (isNotNullOrUndefined(this._pointBorderWidth)) {
            color["pointBorderWidth"] = this._pointBorderWidth;
        }
        if (isNotNullOrUndefined(this._pointRadius)) {
            color["pointRadius"] = this._pointRadius;
        }
        if (isNotNullOrUndefined(this._pointHoverRadius)) {
            color["pointHoverRadius"] = this._pointHoverRadius;
        }
        if (isNotNullOrUndefined(this._pointHitRadius)) {
            color["pointHitRadius"] = this._pointHitRadius;
        }
        if (isNotNullOrUndefined(this._pointHoverBackgroundColor)) {
            //color["pointHoverBackgroundColor"] = this._pointHoverBackgroundColor;
            this.validadeNative("pointHoverBackgroundColor", color, this._pointHoverBackgroundColor, context);
        }
        if (isNotNullOrUndefined(this._pointHoverBorderColor)) {
            //color["pointHoverBorderColor"] = this._pointHoverBorderColor;
            this.validadeNative("pointHoverBorderColor", color, this._pointHoverBorderColor, context);
        }
        if (isNotNullOrUndefined(this._pointHoverBorderWidth)) {
            color["pointHoverBorderWidth"] = this._pointHoverBorderWidth;
        }
        if (isNotNullOrUndefined(this._pointStyle)) {
            color["pointStyle"] = this._pointStyle;
        }
        if (isNotNullOrUndefined(this._hoverBackgroundColor)) {
            //color["hoverBackgroundColor"] = this._hoverBackgroundColor;
            this.validadeNative("hoverBackgroundColor", color, this._hoverBackgroundColor, context);
        }
        if (isNotNullOrUndefined(this._hoverBorderColor)) {
            //color["hoverBorderColor"] = this._hoverBorderColor;
            this.validadeNative("hoverBorderColor", color, this._hoverBorderColor, context);
        }
        if (isNotNullOrUndefined(this._hoverBorderWidth)) {
            color["hoverBorderWidth"] = this._hoverBorderWidth;
        }
        return color;
    }

    private validadeNative(key: string, obj: any, item, context?: CanvasRenderingContext2D): void {
        if (isArray(item)) {
            obj[key] = (item as Array<Color>)
                .map(it => it.toNativeValue());
        } else if (item instanceof Color) {
            obj[key] = (item as Color).toNativeValue();
        } else {
            obj[key] = (item as CanvasGradientBuilder).toNativeValue(context);
        }
    }
}

