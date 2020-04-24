import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {isEmpty, isNotEmpty, isNotNullOrUndefined, isNullOrUndefined} from "../../sr-utils";
import moment from "moment-es6";
import {Model} from "../../sr-http/model";

const DATE_TIME_PATTERN = "YYYY-MM-DDTHH:mm:ss.SSSZZ";
const DATE_PATTERN = "YYYY-MM-DD";

export interface QueryParam {
  [key: string]: string | string[];
}

@Injectable({
  providedIn: "root"
})
export class SrQueryParamUtilsService {

  constructor(protected router: Router, protected route: ActivatedRoute) {
  }

  setQueryParameter(params: { [key: string]: string | string[] }, prefix?: string): SrQueryParamUtilsService {
    if (params !== null && params !== undefined) {
      setTimeout(() => {
        const aux: QueryParam = {};

        const keys: Array<string> = this.route.snapshot.queryParamMap.keys;
        if (keys !== null && keys.length !== 0) {
          keys.forEach(_key => {
            const value = this.route.snapshot.queryParamMap.getAll(_key);
            aux[_key] = value.length === 1 ? value[0] : value;
          });
        }
        prefix = this.preparePrefix(prefix);

        Object.keys(params).forEach(key => {
          aux[prefix + key] = params[key];
        });

        this.router.navigate([], {queryParams: aux});
      }, 0);

    }
    return this;
  }

  setParameter(key: string, value?: string, prefix?: string): SrQueryParamUtilsService {
    const query = {};
    query[key] = value;
    return this.setQueryParameter(query, prefix);
  }

  setParameterIfNotNul(key: string, value?: string, prefix?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(value)) {
      return this.setParameter(key, value, prefix);
    }
    return this;
  }

  getParameter(key: string, prefix?: string): string {
    return this.route.snapshot.queryParamMap.get(this.preparePrefix(prefix) + key);
  }

  setDateParameter(key: string, date: Date, pattenr?: string, prefix?: string): SrQueryParamUtilsService {
    if (isNullOrUndefined(pattenr)) {
      pattenr = DATE_PATTERN;
    }
    this.setParameter(key, moment(date).format(pattenr), prefix);
    return this;
  }

  setDateParameterIfNotNull(key: string, date: Date, pattern?: string, prefix?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(date)) {
      return this.setDateParameter(key, date, pattern, prefix);
    }
    return this;
  }

  getDate(key: string, pattern?: string, prefix?: string): Date {
    if (!this.contains(key, prefix)) {
      return null;
    }
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_PATTERN;
    }
    const momentValue = moment(this.getParameter(key, prefix), pattern);
    return momentValue.isValid() ? momentValue.toDate() : null;
  }

  setDateTimeParameter(key: string, date: Date, pattenr?: string, prefix?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(pattenr)) {
      pattenr = DATE_TIME_PATTERN;
    }
    return this.setDateParameter(key, date, pattenr, prefix);
  }

  setDateTimeParameterIfNotNull(key: string, date: Date, pattern?: string, prefix?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(date)) {
      return this.setDateTimeParameter(key, date, pattern, prefix);
    }
    return this;
  }

  getDateTime(key: string, pattern?: string, prefix?: string): Date {
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_TIME_PATTERN;
    }
    return this.getDate(key, pattern, prefix);
  }

  setModelParam(key: string, model: Model, prefix?: string): SrQueryParamUtilsService {
    this.setParameter(key, isNullOrUndefined(model) ? null : model.id, prefix);
    return this;
  }

  setModelParamIfNotNull(key: string, model: Model, prefix?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(model)) {
      this.setParameter(key, model.id, prefix);
    }
    return this;
  }

  getModel(key: string, type: any, prefix?: string): Model {
    if (!this.contains(key)) {
      return null;
    }
    const newModel = Model.createNewModel(type);
    newModel.id = this.getParameter(key, prefix);
    return newModel;
  }

  contains(key: string, prefix?: string): boolean {
    return this.route.snapshot.queryParamMap.has(this.preparePrefix(prefix) + key);
  }

  getKeys(prefix?: string): string[] {
    prefix = this.preparePrefix(prefix);

    const keys = this.route.snapshot.queryParamMap.keys;

    if (isEmpty(prefix)) {
      return isEmpty(keys) ? [] : keys;
    } else {
      return isEmpty(keys) ? [] : keys.filter(key => key.startsWith(prefix));
    }
  }

  getAllParameter(key: string, prefix?: string): string[] {
    return this.route.snapshot.queryParamMap.getAll(this.preparePrefix(prefix) + key);
  }

  getAll(prefix?: string): QueryParam {
    const aux = {};
    const keys = this.getKeys(prefix);
    if (isNotEmpty(keys)) {
      keys.forEach(key => {
        const parameters = this.getAllParameter(key);
        if (isEmpty(parameters)) {
          aux[key] = parameters;
        } else if (parameters.length > 1) {
          aux[key] = parameters;
        } else {
          aux[key] = parameters[0];
        }
      });
    }
    return aux;
  }

  addPrefix(value: QueryParam, prefix: string): QueryParam {
    const newParams: QueryParam = {};
    if (isNotNullOrUndefined(value)) {
      prefix = this.preparePrefix(prefix);
      Object.keys(value).forEach(key => {
        newParams[prefix + key] = value[key];
      });
    }
    return newParams;
  }

  removePrefix(value: QueryParam, prefix: string): QueryParam {
    const newParams: QueryParam = {};
    if (isNotNullOrUndefined(value) && isNotEmpty(prefix)) {
      Object.keys(value).forEach(key => {
        newParams[key.substring(prefix.length)] = value[key];
      });
    }
    return newParams;
  }

  remove(key: string, prefix?: string): SrQueryParamUtilsService {
    //prefix = this.preparePrefix(prefix);
    if (this.contains(key, prefix)) {
      const aux = {};
      const keys = this.getKeys(prefix);
      prefix = this.preparePrefix(prefix);
      if (isNotEmpty(keys)) {
        keys.filter(k => k !== prefix + key).forEach(k => {
          const parameters = this.getAllParameter(k);
          if (isEmpty(parameters)) {
            aux[k] = parameters;
          } else if (parameters.length > 1) {
            aux[k] = parameters;
          } else {
            aux[k] = parameters[0];
          }
        });
      }
      this.router.navigate([], {queryParams: aux});
    }
    return this;
  }

  private preparePrefix(prefix: string): string {
    return isNullOrUndefined(prefix) ? "" : prefix;
  }
}
