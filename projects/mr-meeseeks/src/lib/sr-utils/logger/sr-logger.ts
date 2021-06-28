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

  public static of(value: string | Object): SrLogg {
    return new SrLogg(value);
  }

  public setProductionMode(value: boolean): void {
    this._data.setProductionMode(value);
    this._error.setProductionMode(value);
    this._info.setProductionMode(value);
    this._warn.setProductionMode(value);
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

class SrLocalLog {
  private readonly localLog: Logger;

  constructor(private prefix: string, private value: string | Object, private color: string, private level: Level) {
    let label: string = "";
    if (isString(value)) {
      label = value as string;
    } else {
      label = (value as Object).constructor.name;
    }
    this.localLog = Log.create(this.prefix + label, this.level);
    this.localLog.color = this.color;
  }

  public setProductionMode(value: boolean): void {
    this.localLog.setProductionMode(value);
  }

  protected send(message: string, ...otherParams: any[]): SrLocalLog {
    (isEmpty(otherParams)) ? this.localLog.data(message) : this.localLog.data(message, otherParams);
    return this;
  }
}

export class SrLoggData extends SrLocalLog {
  constructor(value: string | Object) {
    super("d_", value, "#16c6d0", Level.DATA);
  }

  public static of(value: string | Object): SrLoggData {
    return new SrLoggData(value);
  }

  public data(message: string, ...otherParams: any[]): SrLoggData {
    this.send(message, otherParams);
    return this;
  }
}

export class SrLoggError extends SrLocalLog {
  constructor(value: string | Object) {
    super("e_", value, "#e26a6a", Level.ERROR);
  }

  public static of(value: string | Object): SrLoggError {
    return new SrLoggError(value);
  }

  public error(message: string, ...otherParams: any[]): SrLoggError {
    this.send(message, otherParams);
    return this;
  }
}

export class SrLoggInfo extends SrLocalLog {
  constructor(value: string | Object) {
    super("i_", value, "#92a2b9", Level.INFO);
  }

  public static of(value: string | Object): SrLoggInfo {
    return new SrLoggInfo(value);
  }

  public info(message: string, ...otherParams: any[]): SrLoggInfo {
    this.send(message, otherParams);
    return this;
  }
}

export class SrLoggWarn extends SrLocalLog {
  constructor(value: string | Object) {
    super("w_", value, "#fcb66c", Level.WARN);
  }

  public static of(value: string | Object): SrLoggWarn {
    return new SrLoggWarn(value);
  }

  public warn(message: string, ...otherParams: any[]): SrLoggWarn {
    this.send(message, otherParams);
    return this;
  }
}
