import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

export interface QueryParam {
  [key: string]: string | string[];
}

@Injectable({
  providedIn: "root"
})
export class SrQueryParamUtilsService {

  constructor(protected router: Router, protected route: ActivatedRoute) {
  }

  setQueryParameter(params: QueryParam) {
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
  }

  getQueryParameter(key: string): string {
    return this.route.snapshot.queryParamMap.get(key);
  }

  getAllQueryParameter(key: string): string[] {
    return this.route.snapshot.queryParamMap.getAll(key);
  }

}
