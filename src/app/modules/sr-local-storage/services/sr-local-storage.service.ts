import {Injectable} from "@angular/core";
import * as Crypt from "crypto-js";
import {isArray, isBoolean, isDate, isEmpty, isNullOrUndefined, isNumber, isObject, isString} from "../../sr-utils";
import moment from "moment-es6";
import {ErrorMessage} from "../../sr-http/model";

const DATE_PATTERN = "YYYY-MM-DDTHH:mm:ss.SSSZZ";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable({
  providedIn: "root"
})
export class SrLocalStorageService {

  constructor() {
  }

  set(key: string, value: string, seedEncrypt?: string, encryptKey?: boolean): SrLocalStorageService {
    if (isEmpty(seedEncrypt)) {
      window.localStorage[key] = value;
    } else {
      if (isNullOrUndefined(encryptKey)) {
        encryptKey = true;
      }
      const localKey: string = encryptKey ? this.encripty(key, seedEncrypt) : key;
      window.localStorage[localKey] = this.encripty(value, seedEncrypt);
    }
    return this;
  }

  get(key: string, defaultValue = null, seedEncrypt?: string, encryptKey?: boolean): string {
    if (isEmpty(seedEncrypt)) {
      return window.localStorage[key] || defaultValue;
    } else {
      if (isNullOrUndefined(encryptKey)) {
        encryptKey = true;
      }
      const localKey: string = encryptKey ? this.decrypt(key, seedEncrypt) : key;
      const result = window.localStorage[localKey];
      return isEmpty(result) ? defaultValue : this.decrypt(result, seedEncrypt);
    }
  }

  setObject(key: string, value: object, seedEncrypt?: string, encryptKey?: boolean): SrLocalStorageService {
    if (isEmpty(seedEncrypt)) {
      window.localStorage[key] = JSON.stringify(value);
    } else {
      if (isNullOrUndefined(encryptKey)) {
        encryptKey = true;
      }
      const localKey: string = encryptKey ? this.encripty(key, seedEncrypt) : key;
      window.localStorage[localKey] = JSON.stringify(this.encriptyObject(value, seedEncrypt));
    }
    return this;
  }

  getObject(key: string, seedEncrypt?: string, encryptKey?: boolean) {
    if (isEmpty(seedEncrypt)) {
      return JSON.parse(window.localStorage.getItem(key));
    } else {
      if (isNullOrUndefined(encryptKey)) {
        encryptKey = true;
      }
      const localKey: string = encryptKey ? this.decrypt(key, seedEncrypt) : key;
      return this.decriptyObject(JSON.parse(window.localStorage.getItem(localKey)), seedEncrypt);
    }
  }

  remove(key: string): SrLocalStorageService {
    window.localStorage.removeItem(key);
    return this;
  }

  clear(): SrLocalStorageService {
    window.localStorage.clear();
    return this;
  }

  private encripty(value: string, seed: string): string {
    return Crypt.AES.encrypt(value, seed).toString();
  }

  private decrypt(value: string, seed: string) {
    return Crypt.AES.decrypt(value, seed).toString(Crypt.enc.Utf8);
  }

  private encriptyObject(value: Object, seed: string): Object {
    if (isNullOrUndefined(value)) {
      return null;
    }

    if (isString(value)) {
      return this.encripty("string|" + (value as string), seed);
    } else if (isBoolean(value)) {
      return this.encripty((value as boolean) ? "boolean|true" : "boolean|false", seed);
    } else if (isDate(value)) {
      return this.encripty("date|" + moment(value as Date).format(DATE_PATTERN), seed);
    } else if (isArray(value)) {
      return (value as Array<any>).map(it => this.encriptyObject(it, seed));
    } else if (isNumber(value)) {
      return "number|" + this.encripty((value as number).toString(), seed);
    } else if (isObject(value)) {
      const result = {};
      Object.keys(value).forEach(key => {
        result[this.encripty(key, seed)] = this.encriptyObject(value[key], seed);
      });
      return result;
    } else {
      throw new ErrorMessage("erro ao encripytar");
    }
  }

  private decriptyObject(value: Object, seed: string): Object {
    if (isNullOrUndefined(value)) {
      return null;
    }

    if (isString(value)) {
      const valueSplit = (this.decrypt(value as string, seed)).split("|");
      if (valueSplit[0] === "string") {
        return valueSplit[1];
      } else if (valueSplit[0] === "boolean") {
        return valueSplit[1] === "true" ? true : false;
      } else if (valueSplit[0] === "date") {
        return moment(valueSplit[1], DATE_PATTERN).toDate();
      } else if (valueSplit[0] === "number") {
        return Number(valueSplit[1]);
      }
    } else if (isArray(value)) {
      return (value as Array<any>).map(it => this.decriptyObject(it, seed));
    } else if (isObject(value)) {
      const result = {};
      Object.keys(value).forEach(key => {
        result[this.decrypt(key, seed)] = this.decriptyObject(value[key], seed);
      });
      return result;
    } else {
      throw new ErrorMessage("erro ao decripytar");
    }
  }
}
