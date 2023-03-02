import {
  isArray,
  isEmpty,
  isEquals,
  isNotNullOrUndefined,
  isNullOrUndefined,
  isObject,
  isString
} from "../../sr-utils/commons/sr-commons.model";
import {ClassTransformOptions, plainToClass, plainToClassFromExist, TransformOptions} from "class-transformer";
import {MetadataDocument} from "./metadata-document.model";


export interface Model {
  id: string;

  document: MetadataDocument;
}

export namespace Model {

  export function createNewModel<T extends Model>(type: { new(): T; }): T {
    return new type();
  }

  export function createNew(type: { new(): any; }): any {
    return new type();
  }

  export function compare<T extends Model>(value: T, otherValue: T): boolean {
    if (isNullOrUndefined(value) && isNullOrUndefined(otherValue)) {
      return true;
    }
    if ((isNullOrUndefined(value) && isNotNullOrUndefined(otherValue)) || (isNullOrUndefined(otherValue) && isNotNullOrUndefined(value))) {
      return false;
    }
    return value.id === otherValue.id;
  }

  export function simpleCompare(value: any, otherValue: any): boolean {
    return isEquals(value, otherValue);
  }

  /**
   * Realiza o processo de databinding de um determinado component
   * para um modelo qualquer
   *
   * @param currentValue -> valor para se fezer merger
   * @param value        -> valor a ser usado no processo
   * @param clazz        -> modelo para fazer o databinding
   *
   * @return instance -> instancia de modelo com o databinding já realizado!
   */
  export function databinding(currentValue: any, value: any, clazz?: any, options?: ClassTransformOptions): object {
    if (isNullOrUndefined(currentValue)) {
      return plainToClass(clazz, value, options);
    }
    plainToClassFromExist(currentValue, value, options);
    return currentValue;
  }

  export function serializeOpts(): TransformOptions {
    return {toPlainOnly: true};
  }

  export function serialize(model: Model | Array<Model>): string | Array<string> {
    if (isNullOrUndefined(model)) {
      return null;
    } else if (isArray(model)) {
      return (model as Array<Model>)
        .map(it => serialize(it) as string);
    } else {
      return (model as Model).id;
    }
  }

  export function deserializeOpts(): TransformOptions {
    return {toClassOnly: true};
  }

  export function deserialize(value: string | Array<string> | any, type): Model | Array<Model> {
    //se for algo null apenas retornamos
    if (isNullOrUndefined(value)) return null;
    //criando uma nova instancia
    let model = Model.createNewModel(type);

    //é uma string?
    if (isString(value)) {
      //está vazia ?
      if (isEmpty(value)) {
        //apenas atribuimos null
        model = null;
      } else {
        //apenas atribui o valor apara o id
        model.id = value;
      }
    } else if (isArray(value)) {
      return value.map(it => deserialize(it, type));
    } else if (isObject(value)) {
      //se chegou aqui, quer dizer que é um objeto
      //realizando o databinding necessário
      model = databinding(value as any, type) as Model;
    } else {
      model = value;
    }
    return model;
  }

  export function cloneObject(value: any, clazz?: any): object {
    if (isNullOrUndefined(value)) {
      return null;
    }
    if (isNotNullOrUndefined(clazz)) {
      return databinding(null, value, clazz);
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
}
