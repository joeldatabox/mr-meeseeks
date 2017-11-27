import {Injectable} from "@angular/core";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class SrLocalStorageService {

  constructor() {
  }

  set(key: string, value: string): SrLocalStorageService {
    window.localStorage[key] = value;
    return this;
  }

  get(key: string, defaultValue = null): string {
    return window.localStorage[key] || defaultValue;
  }

  setObject(key: string, value: object): SrLocalStorageService {
    window.localStorage[key] = JSON.stringify(value);
    return this;
  }

  getObject(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  remove(key: string): SrLocalStorageService {
    window.localStorage.removeItem(key);
    return this;
  }

  clear(): SrLocalStorageService {
    window.localStorage.clear();
    return this;
  }
}
