import {AfterViewInit, Directive, Input} from "@angular/core";
import {MatTab, MatTabGroup} from "@angular/material";
import {isEmpty, isNullOrUndefined, isString} from "../../sr-utils/commons/sr-commons.model";
import {removeDiacritics} from "../../sr-utils/commons/sr-diacritics";
import {SrQueryParamUtilsService} from "../../sr-route-utils/services/sr-query-param-utils.service";

@Directive({
  selector: "[srAutoTab]"
})
export class SrAutoTabDirective implements AfterViewInit {
  protected tabs: Map<number, string> = new Map<number, string>();

  @Input("srAutoTab")
  tabParam: string;

  constructor(protected matTabGroup: MatTabGroup, protected queryParamUtilsService: SrQueryParamUtilsService) {
  }

  ngAfterViewInit(): void {
    if (isNullOrUndefined(this.matTabGroup) || !(this.matTabGroup instanceof MatTabGroup)) {
      throw new Error("Essa diretiva deve ser usada somente em MatTabGroup");
    }

    //se não for informado um nome de parametro para a tab deixamos o padrão
    if (isEmpty(this.tabParam)) {
      this.tabParam = "tab";
    }

    //criando o map para facilitar a alteração do parametro
    this.matTabGroup._tabs.toArray().forEach((tab: MatTab, index: number) => {
      //daremos preferencia para o parametro arialabel
      //se o mesmo não existir pegando o label da tab
      this.tabs.set(index, isEmpty(tab.ariaLabel) ? removeDiacritics(tab.textLabel) : removeDiacritics(tab.ariaLabel));
    });

    //verificando se tem algum parametro na url relacionado a tab
    this.setIndexTab(this.queryParamUtilsService.getQueryParameter(this.tabParam));

    //colocando um ouvinte para automatizar a atulização dos parametros
    this.matTabGroup.selectedIndexChange.subscribe(index => {
      const _param = {};
      _param[this.tabParam] = this.tabs.get(index);
      this.queryParamUtilsService.setQueryParameter(_param);
    });
  }

  setIndexTab(param) {
    let index = null;
    if (isNullOrUndefined(param)) {
      index = 0;
    } else if (isString(param)) {
      this.tabs.forEach((value: string, key: number) => {
        if (value === param as string) {
          index = key;
        }
      });
    } else {
      index = param;
    }
    this.matTabGroup.selectedIndex = index;
    const _param = {};
    _param[this.tabParam] = this.tabs.get(index);
    this.queryParamUtilsService.setQueryParameter(_param);
  }

  /*setQueryParameter(key: string, value: string) {
    if (isNotNullOrUndefined(key)) {
      const params = {};
      const keys: Array<string> = this.route.snapshot.queryParamMap.keys;
      if (!isEmpty(keys)) {
        keys.forEach(_key => params[_key] = this.route.snapshot.queryParamMap.get(_key));
      }
      params[key] = value;
      this.router.navigate([], {queryParams: params});
    }
  }*/

}
