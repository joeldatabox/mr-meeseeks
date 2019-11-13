import {deserialize, plainToClass, TransformOptions} from "class-transformer";
import {isNotNullOrUndefined} from "../../../sr-utils";
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

export function deserializeItem(value: object, clazz: any): any {
  try {
    const result = deserialize(clazz, JSON.stringify(value)) as any;
    //this.log.d("payload response", result);
    return result;
  } catch (error) {
    const errorResult = {};
    errorResult["error"] = error;
    errorResult["clazz"] = clazz;
    errorResult["payload"] = value;
    //this.log.e("error on deserialize item ", errorResult);
    throw errorResult;
  }
}

export function deserializeArray(values, clazz: any): Array<any> {
  let itens = new Array<any>();
  if (isNotNullOrUndefined(values)) {
    try {
      itens = <Array<any>>plainToClass(clazz, values);
      this.log.d("payload response", itens);
    } catch (error) {
      const errorResult = {};
      errorResult["error"] = error;
      errorResult["clazz"] = clazz;
      errorResult["payload"] = values;
      this.log.e("error on deserialize ", errorResult);
      throw errorResult;
    }
  }
  return itens;
}

export function deserializeListResource(value: any, clazz: any): ListResource<any> {
  const list = new ListResource<any>();

  if (isNotNullOrUndefined(value)) {
    try {
      list.records = <Array<any>>plainToClass(clazz, value.records);
      list._metadata = deserialize(MetaData, JSON.stringify(value._metadata));
      this.log.d("payload response", list);
    } catch (error) {
      const errorResult = {};
      errorResult["error"] = error;
      errorResult["clazz"] = clazz;
      errorResult["payload"] = value;
      this.log.e("error on deserialize ", errorResult);
      throw errorResult;
    }
  }
  return list;
}
