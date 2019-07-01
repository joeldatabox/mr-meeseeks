import {isEmpty, isNotNullOrUndefined} from "../../sr-utils/commons/sr-commons.model";

export class MetaData {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  links: Link[];

  constructor(inst?: any) {
    // @ts-ignore
    this.links = new Array();
    if (isNotNullOrUndefined(inst)) {
      this.page = inst.page;
      this.pageSize = inst.pageSize;
      this.totalPages = inst.totalPages;
      this.totalRecords = inst.totalRecords;
      this.totalRecords = inst.totalRecords;
      if (!isEmpty(inst.links)) {
        // @ts-ignore
        inst.links.forEach(l => this.links.push(new Link(l)));
      }
    }
  }


  public hasFirstPage(): boolean {
    return this.hasRel("first");
  }

  public firstPage(): string {
    return this.getHref("first");
  }

  public hasPreviusPage(): boolean {
    return this.hasRel("previus");
  }

  public previusPage(): string {
    return this.getHref("previus");
  }

  public hasNextPage(): boolean {
    return this.hasRel("next");
  }

  public nextPage(): string {
    return this.getHref("next");
  }

  public hasLastPage(): boolean {
    return this.hasRel("last");
  }

  public lastPage(): string {
    return this.getHref("last");
  }

  protected hasRel(rel: string): boolean {
    // @ts-ignore
    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i].rel === rel) {
        return true;
      }
    }
    return false;
  }

  protected getHref(rel: string): string {
    // @ts-ignore
    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i].rel === rel) {
        return this.links[i].href;
        /*return environment.production ?
          this.links[i].href :
          this.links[i].href.substr(this.links[i].href.indexOf("/api/"))
          ;*/
      }
    }
    return "";
  }
}

export class Link {
  rel: string;
  href: string;

  constructor(inst?: any) {
    if (isNotNullOrUndefined(inst)) {
      this.rel = inst.rel;
      this.href = inst.href;
    }
  }
}
