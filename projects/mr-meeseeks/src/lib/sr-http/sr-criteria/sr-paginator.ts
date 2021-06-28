import {SrCriterion} from "./sr-criterion";
import {$skip} from "./sr-skip";
import {$limit} from "./sr-limit";

export class SrPaginator extends SrCriterion {
  private indexPage: number;
  private pageSize: number;


  constructor(indexPage: number, pageSize: number) {
    super();
    this.indexPage = indexPage;
    this.pageSize = pageSize;
  }

  build(): string {
    let skp = this.indexPage === 0 ? $skip(this.indexPage) : $skip(this.indexPage * this.pageSize);
    const lmt = $limit(this.pageSize);
    if (this.indexPage === 0) {
      skp = $skip(this.indexPage);
    }
    return skp.build() + "&" + lmt.build();
  }
}

export function $paginator(indexPage: number, pageSize: number): SrPaginator {
  return new SrPaginator(indexPage, pageSize);
}
