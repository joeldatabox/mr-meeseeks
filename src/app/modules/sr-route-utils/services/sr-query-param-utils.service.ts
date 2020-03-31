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

  setQueryParameter(params: { [key: string]: string | string[] }): SrQueryParamUtilsService {
    if (params !== null && params !== undefined) {
      const aux: QueryParam = {};

      const keys: Array<string> = this.route.snapshot.queryParamMap.keys;
      if (keys !== null && keys.length !== 0) {
        keys.forEach(_key => {
          const value = this.route.snapshot.queryParamMap.getAll(_key);
          aux[_key] = value.length === 1 ? value[0] : value;
        });
      }

      Object.keys(params).forEach(key => {
        aux[key] = params[key];
      });

      this.router.navigate([], {queryParams: aux});

    }
    return this;
  }

  setParameter(key: string, value?: string): SrQueryParamUtilsService {
    const query = {};
    query[key] = value;
    return this.setQueryParameter(query);
  }

  setParameterIfNotNul(key: string, value?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(value)) {
      return this.setParameter(key, value);
    }
    return this;
  }

  getParameter(key: string): string {
    return this.route.snapshot.queryParamMap.get(key);
  }

  setDateParameter(key: string, date: Date, pattenr?: string): SrQueryParamUtilsService {
    if (isNullOrUndefined(pattenr)) {
      pattenr = DATE_PATTERN;
    }
    this.setParameter(key, moment(date).format(pattenr));
    return this;
  }

  setDateParameterIfNotNull(key: string, date: Date, pattern?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(date)) {
      return this.setDateParameter(key, date, pattern);
    }
    return this;
  }

  getDate(key: string, pattern?: string): Date {
    if (!this.contains(key)) {
      return null;
    }
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_PATTERN;
    }
    const momentValue = moment(this.getParameter(key), pattern);
    return momentValue.isValid() ? momentValue.toDate() : null;
  }

  setDateTimeParameter(key: string, date: Date, pattenr?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(pattenr)) {
      pattenr = DATE_TIME_PATTERN;
    }
    return this.setDateParameter(key, date, pattenr);
  }

  setDateTimeParameterIfNotNull(key: string, date: Date, pattern?: string): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(date)) {
      return this.setDateTimeParameter(key, date, pattern);
    }
    return this;
  }

  getDateTime(key: string, pattern?: string): Date {
    if (isNullOrUndefined(pattern)) {
      pattern = DATE_TIME_PATTERN;
    }
    return this.getDate(key, pattern);
  }

  setModelParam(key: string, model: Model): SrQueryParamUtilsService {
    this.setParameter(key, isNullOrUndefined(model) ? null : model.id);
    return this;
  }

  setModelParamIfNotNull(key: string, model: Model): SrQueryParamUtilsService {
    if (isNotNullOrUndefined(model)) {
      this.setParameter(key, model.id);
    }
    return this;
  }

  getModel(key: string, type: any): Model {
    if (!this.contains(key)) {
      return null;
    }
    const newModel = Model.createNewModel(type);
    newModel.id = this.getParameter(key);
    return newModel;
  }

  contains(key: string): boolean {
    return this.route.snapshot.queryParamMap.has(key);
  }

  getKeys(): string[] {
    return this.route.snapshot.queryParamMap.keys;
  }

  getAllParameter(key: string): string[] {
    return this.route.snapshot.queryParamMap.getAll(key);
  }

  getAll(): QueryParam {
    const aux = {};
    const keys = this.getKeys();
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

}
