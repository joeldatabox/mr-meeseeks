import {MetaData} from "./metadata.model";
import {isNullOrUndefined} from "../../sr-utils";

export class ListResource<T> {

  records: Array<T>;
  _metadata: MetaData;

  constructor() {
    this.records = new Array();
  }

  public size(): number {
    return this.records.length;
  }

  public isEmpty(): boolean {
    if (!isNullOrUndefined(this.records)) {
      return this.records.length === 0;
    }
    return true;
  }

  public clear(): ListResource<T> {
    this.records = new Array();
    return this;
  }

  public push(item: T): number {
    return this.records.push(item);
  }

  public pushAll(itens: Array<T> | ListResource<T>): ListResource<T> {
    let records;
    if (Array.isArray(itens)) {
      records = itens;
    } else {
      records = itens.records;
    }
    records.forEach(i => this.push(i));
    return this;
  }

  public hasFirstPage(): boolean {
    return this._metadata.hasFirstPage();
  }

  public hasPreviusPage(): boolean {
    return this._metadata.hasPreviusPage();
  }

  public hasNextPage(): boolean {
    return this._metadata.hasNextPage();
  }

  public hasLastPage(): boolean {
    return this._metadata.hasLastPage();
  }

  public getById(id: string): T {
    if (this.isEmpty()) {
      return null;
    } else {
      return this.records.filter(item => item["id"] === id)[0];
    }
  }
}
