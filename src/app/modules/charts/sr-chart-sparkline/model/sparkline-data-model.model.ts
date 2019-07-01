import {isNotNullOrUndefined, isNullOrUndefined} from "../../../sr-utils/commons/sr-commons.model";

export class SrSparklineDataItem {
  private _label: any;
  private _value: any;

  constructor(label: any, value: any) {
    this._label = label;
    this._value = value;
  }

  get label(): any {
    return this._label;
  }

  get value(): any {
    return this._value;
  }
}

export class SrSparklineData {
  private _label: string = "Sparklinelabel";
  data: Array<SrSparklineDataItem>;

  constructor(data?: Array<SrSparklineDataItem>) {
    if (isNotNullOrUndefined(data)) {
      this.data = data;
    } else {
      this.data = new Array<SrSparklineDataItem>();
    }
  }

  get label(): string {
    return this._label;
  }

  addItem(item: SrSparklineDataItem): SrSparklineData {
    this.data.push(item);
    return this;
  }
}

export class SrSparklineDataSet {
  private _data: SrSparklineData;

  constructor(data?: SrSparklineData) {
    if (isNullOrUndefined(data)) {
      data = new SrSparklineData();
    }
    this._data = data;
  }

  toNativeData(color: any): any {
    const dataSet = {
      "data": this._data.data.map(i => i.value),
      "label": this._data.data.map(i => i.label)
    };
    if (isNotNullOrUndefined(color)) {
      Object.assign(dataSet, color);
    }
    return {
      labels: this._data.data.map(i => i.label),
      datasets: [
        dataSet
      ]
    };
  }
}

export interface SrSparkLineColor {
  backgroundColor: string;
  borderColor: string;
  pointBackgroundColor: string;
  pointBorderColor: string;
  pointHoverBackgroundColor: string;
  pointHoverBorderColor: string;
}
