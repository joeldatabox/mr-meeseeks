import {Level, Log, Logger} from "ng2-logger/browser";
import {isEmpty, isString} from "../commons/sr-commons.model";

export class SrLogg {
  private readonly _data: SrLoggData;
  private readonly _error: SrLoggError;
  private readonly _info: SrLoggInfo;
  private readonly _warn: SrLoggWarn;

  constructor(private value: string | Object) {
    this._data = SrLoggData.of(value);
    this._error = SrLoggError.of(value);
    this._info = SrLoggInfo.of(value);
    this._warn = SrLoggWarn.of(value);
  }

  public static setProductionMode() {
    Log.setProductionMode();
  }

  public static of(value: string | Object): SrLogg {
    return new SrLogg(value);
  }

  public d(message: string, ...otherParams: any[]): SrLogg {
    this._data.data(message, otherParams);
    return this;
  }

  public e(message: string, ...otherParams: any[]): SrLogg {
    this._error.error(message, otherParams);
    return this;
  }

  public i(message: string, ...otherParams: any[]): SrLogg {
    this._info.info(message, otherParams);
    return this;
  }

  public w(message: string, ...otherParams: any[]): SrLogg {
    this._warn.warn(message, otherParams);
    return this;
  }
}

export class SrLoggData {
  private readonly _data: Logger<object>;

  constructor(private value: string | Object) {
    let label: string = "";
    if (isString(value)) {
      label = value as string;
    } else {
      label = (value as Object).constructor.name;
    }
    this._data = Log.create("d_" + label, Level.DATA);
    this._data.color = "#16c6d0";
  }

  public static setProductionMode() {
    Log.setProductionMode();
  }

  public static of(value: string | Object): SrLoggData {
    return new SrLoggData(value);
  }

  public data(message: string, ...otherParams: any[]): SrLoggData {
    (isEmpty(otherParams)) ? this._data.data(message) : this._data.data(message, otherParams);
    return this;
  }
}

export class SrLoggError {
  private readonly _error: Logger<object>;

  constructor(private value: string | Object) {
    let label: string = "";
    if (isString(value)) {
      label = value as string;
    } else {
      label = (value as Object).constructor.name;
    }
    this._error = Log.create("e_" + label, Level.ERROR);
    this._error.color = "#e26a6a";
  }

  public static setProductionMode() {
    Log.setProductionMode();
  }

  public static of(value: string | Object): SrLoggError {
    return new SrLoggError(value);
  }

  public error(message: string, ...otherParams: any[]): SrLoggError {
    (isEmpty(otherParams)) ? this._error.error(message) : this._error.error(message, otherParams);
    return this;
  }
}

export class SrLoggInfo {
  private readonly _info: Logger<object>;

  constructor(private value: string | Object) {
    let label: string = "";
    if (isString(value)) {
      label = value as string;
    } else {
      label = (value as Object).constructor.name;
    }
    this._info = Log.create("i_" + label, Level.INFO);
    this._info.color = "#92a2b9";
  }

  public static setProductionMode() {
    Log.setProductionMode();
  }

  public static of(value: string | Object): SrLoggInfo {
    return new SrLoggInfo(value);
  }

  public info(message: string, ...otherParams: any[]): SrLoggInfo {
    (isEmpty(otherParams)) ? this._info.info(message) : this._info.info(message, otherParams);
    return this;
  }
}

export class SrLoggWarn {
  private readonly _warn: Logger<object>;

  constructor(private value: string | Object) {
    let label: string = "";
    if (isString(value)) {
      label = value as string;
    } else {
      label = (value as Object).constructor.name;
    }
    this._warn = Log.create("w_" + label, Level.WARN);
    this._warn.color = "#fcb66c";
  }

  public static setProductionMode() {
    Log.setProductionMode();
  }

  public static of(value: string | Object): SrLoggWarn {
    return new SrLoggWarn(value);
  }

  public warn(message: string, ...otherParams: any[]): SrLoggWarn {
    (isEmpty(otherParams)) ? this._warn.warn(message) : this._warn.warn(message, otherParams);
    return this;
  }
}
