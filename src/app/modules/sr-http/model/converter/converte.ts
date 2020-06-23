import {deserialize, plainToClass, TransformOptions} from "class-transformer";
//import {isNotNullOrUndefined} from "../../../sr-utils/commons/sr-commons.model";
import {SrLogg} from "../../../sr-utils/logger/sr-logger";
import {ListResource} from "../list-resource.model";
import {MetaData} from "../metadata.model";

export abstract class ClassSerialize<T> {
  public static readonly conf: TransformOptions = {toPlainOnly: true};

  abstract serialize(value: T): string;
}

export abstract class ClassDeserialize<T> {
  public static readonly conf: TransformOptions = {toClassOnly: true};

  abstract deserialize(value: string): T;
}

export function deserializeItem(value: object, clazz: any, log?: SrLogg): any {

  try {
    const result = deserialize(clazz, JSON.stringify(value)) as any;
    if (isNotNullOrUndefined(log)) {
      log.d("payload response", result);
    }
    return result;
  } catch (error) {
    const errorResult = {};
    errorResult["error"] = error;
    errorResult["clazz"] = clazz;
    errorResult["payload"] = value;
    if (isNotNullOrUndefined(log)) {
      log.e("error on deserialize item ", errorResult);
    }
    throw errorResult;
  }
}

export function deserializeArray(values, clazz: any, log?: SrLogg): Array<any> {
  let itens = new Array<any>();
  if (isNotNullOrUndefined(values)) {
    try {
      itens = <Array<any>>plainToClass(clazz, values);
      if (isNotNullOrUndefined(log)) {
        log.d("payload response", itens);
      }
    } catch (error) {
      const errorResult = {};
      errorResult["error"] = error;
      errorResult["clazz"] = clazz;
      errorResult["payload"] = values;
      if (isNotNullOrUndefined(log)) {
        log.e("error on deserialize ", errorResult);
      }
      throw errorResult;
    }
  }
  return itens;
}

export function deserializeListResource(value: any, clazz: any, log?: SrLogg): ListResource<any> {
  const list = new ListResource<any>();

  if (isNotNullOrUndefined(value)) {
    try {
      list.records = <Array<any>>plainToClass(clazz, value.records);
      list._metadata = deserialize(MetaData, JSON.stringify(value._metadata));
      if (isNotNullOrUndefined(log)) {
        log.d("payload response", list);
      }
    } catch (error) {
      const errorResult = {};
      errorResult["error"] = error;
      errorResult["clazz"] = clazz;
      errorResult["payload"] = value;
      if (isNotNullOrUndefined(log)) {
        log.e("error on deserialize ", errorResult);
      }
      throw errorResult;
    }
  }
  return list;
}

function isNotNullOrUndefined(...value: any[]): boolean {
  if (value === null || value === undefined) return false;
  let result = true;
  for (let i = 0; i < value.length; i++) {
    result = (!(value[i] === null || value[i] === undefined)) && result;
  }
  return result;
}
