import {MetaData} from "./metadata.model";

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
    if (!_isNullOrUndefined(this.records)) {
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
      records = itens as Array<T>;
    } else {
      records = (itens as ListResource<T>).records;
      this._metadata.add((itens as ListResource<T>)._metadata);
    }
    records.forEach(i => this.push(i));
    return this;
  }

  public hasFirstPage(): boolean {
    if (_isNullOrUndefined(this._metadata)) {
      return false;
    }
    return this._metadata.hasFirstPage();
  }

  public hasPreviusPage(): boolean {
    if (_isNullOrUndefined(this._metadata)) {
      return false;
    }
    return this._metadata.hasPreviusPage();
  }

  public hasNextPage(): boolean {
    if (_isNullOrUndefined(this._metadata)) {
      return false;
    }
    return this._metadata.hasNextPage();
  }

  public hasLastPage(): boolean {
    if (_isNullOrUndefined(this._metadata)) {
      return false;
    }
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

function _isNullOrUndefined(...value: any[]): boolean {
  if (value === null || value === undefined) return true;
  let result = true;
  for (let i = 0; i < value.length; i++) {
    result = (value[i] === null || value[i] === undefined) && result;
  }
  return result;
}

/**
 * checks if any value is instance of ListResource
 * @param value -> any
 * @return true if value is instance of ListResource
 */
export function isListResource(value: any): boolean {
  return value instanceof ListResource;
}
