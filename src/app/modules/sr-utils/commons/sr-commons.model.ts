import {isListResource, ListResource} from "../../sr-http/model/list-resource.model";
import {Model} from "../../sr-http/model/model";
import {ErrorMessage} from "../../sr-http/model";

/**
 * Create a simple instance of a generic class;
 * @param type -> the class you need to instantiate
 * @return a simple instance of your class
 */
export function newInstanceOf<T>(type: { new(): T; }): T {
  return new type();
}

/**
 * checks if any element is null or undefined
 * @param value -> array of any elements or single element
 * @return true if all values of parameters is null and undefined
 */

export function isNullOrUndefined(...value: any[]): boolean {
  if (value === null || value === undefined) return true;
  let result = true;
  for (let i = 0; i < value.length; i++) {
    result = (value[i] === null || value[i] === undefined) && result;
  }
  return result;
}

/**
 * checks if any element is not null or undefined
 * @param value -> array of any elements or single element
 * @return true if all values of parameters is not null and undefined
 */
export function isNotNullOrUndefined(...value: any[]): boolean {
  if (value === null || value === undefined) return false;
  let result = true;
  for (let i = 0; i < value.length; i++) {
    result = (!(value[i] === null || value[i] === undefined)) && result;
  }
  return result;
}

/**
 * checks if array, ListResource or any element instance of String is null, undefined or empty
 * @param value -> array, ListResource of any instance of String
 * @return true if value is null, undefined or empty
 */
export function isEmpty(value: string | ListResource<any> | Array<any> | any): boolean {
  if (isNullOrUndefined(value)) {
    return true;
  }

  if (isString(value) || isArray(value)) {
    return (value as string | Array<any>).length === 0;
  }

  if (isListResource(value)) {
    return (value as ListResource<any>).isEmpty();
  }

  if ((value as any).length > 0) {
    return false;
  }
  throw new ErrorMessage("value is not expected");
}

/**
 * checks if array, ListResource or any element instance of String is not null, undefined or not empty
 * @param value -> array, ListResource of any instance of String
 * @return true if value is not null, undefined or not empty
 */
export function isNotEmpty(value: string | ListResource<any> | Array<any>): boolean {
  return !isEmpty(value);
}

/**
 * checks if any value is instance of Object
 * @param value -> any
 * @return true if value is instance of Object
 */
export function isObject(value: any): boolean {
  return value instanceof Object;
}

/**
 * checks if any value is instance of String
 * @param value -> any
 * @return true if value is instance of String
 */
export function isString(value: any): boolean {
  return typeof value === "string";
}

/**
 * checks if any value is boolean
 * @param value -> any
 * @return true if value is instance of boolean
 */
export function isBoolean(value: any): boolean {
  return typeof value === "boolean";
}

/**
 * checks if any value is instance of Date
 * @param value -> any
 * @return true if value is instance of Date
 */
export function isDate(value: any): boolean {
  return value instanceof Date;
}

/**
 * checks if any value is instance of Array
 * @param value -> any
 * @return true if value is instance of Array
 */
export function isArray(value: any): boolean {
  return Array.isArray(value);
}

/**
 * checks if any value is instance of Array
 * @param value -> any
 * @param otherValue -> any
 * @return true if both values are identical
 */
export function isEquals(value: any, otherValue: any): boolean {
  return JSON.stringify(value) === JSON.stringify(otherValue);
}

/**
 * checks if any value is number
 * @param value -> any
 * @return true if value is instance of Number
 */
export function isNumber(value: any): boolean {
  return !isNaN(value);
}

/**
 * checks if any value is string, boolean, date or number
 * @param value -> any
 * @return true if value is instance of Number
 */
export function isPrimitive(value: any): boolean {
  return isString(value) || isBoolean(value) || isDate(value) || isNumber(value);
}

export function cloneObject(value: any, clazz?: any): object {
  if (isNullOrUndefined(value)) {
    return null;
  }
  if (isNotNullOrUndefined(clazz)) {
    return Model.databinding(null, value, clazz);
  }
  const clone = {};

  Object.keys(value).forEach(key => {
    if (isArray(value[key])) {
      clone[key] = new Array(value[key]);
    } else if (isObject(value[key])) {
      clone[key] = cloneObject(value[key]);
    } else {
      clone[key] = value[key];
    }
  });
  return clone;
}

export function splitArray(values: Array<any>, size: number) {
  if (isEmpty(values)) {
    return [];
  }
  const result: Array<any> = new Array<any>();
  while (values.length) {
    result.push(values.splice(0, size));
  }
  return result;
}
