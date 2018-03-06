import {Type} from "class-transformer";


export class MetaData {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  @Type(() => Link)
  links: Link[];

  constructor() {
    this.links = new Array();
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
    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i].rel === rel) {
        return true;
      }
    }
    return false;
  }

  protected getHref(rel: string): string {
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
}
