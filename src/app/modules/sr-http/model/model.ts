import {isEmpty, isNullOrUndefined, isObject, isString} from "../../sr-utils";
import {plainToClass, TransformOptions} from "class-transformer";


export interface Model {
  id: string;
}

export namespace Model {

  export function createNewModel<T extends Model>(type: { new(): T; }): T {
    return new type();
  }

  export function createNew(type: { new(): any; }): any {
    return new type();
  }


  /*export function databinding(value: any, model: any): object {
    //se o value for null apenas setamos null também
    if (isNullOrUndefined(value)) {
      model = null;
      return model;
      //devemos verificar se é necessário instanciar o model
    } else if (isNullOrUndefined(model)) {
      //verificando qual é o timo do model
      if (isObject(value)) {
        model = {};
      } else if (isString(value)) {
        model = "";
      } else if (isBoolean(value)) {
        model = false;
      } else if (isDate(value)) {
        model = new Date();
      } else if (isNumber(value)) {
        model = 0;
      }
    }
    //se for um array devemos percorrer todos os indices
    if (isArray(value)) {
      if (isNotNullOrUndefined(model)) {
        model = [];
      }
      //percorrendo indices
      (value as Array<any>).map((item, index) => {
        //se existir o indice atual no model devemos utilizar a recursividade
        if (isNotNullOrUndefined(model[index])) {
          model[index] = databinding(item, model[index]);
        } else {
          //se não apenas atribuimos
          model.push(item);
        }
      });
    } else if (isObject(value)) {
      //pegando todas as chaves do objeto
      Object.keys(value).forEach(key => {
        //pegando o campo da chave atual
        const path = value[key];
        //verificando apenas campos não nulos
        if (isNotNullOrUndefined(path)) {
          //se o campo for algum tipo primitivo, basta apenas adicionar o mesmo no retorno
          if (isString(path) || isBoolean(path) || isDate(path) || isNumber(path)) {
            model[key] = path;
            //se for um object faz recursividade
          } else if (isObject(path)) {
            model[key] = databinding(path, model[key]);
          } else {
            //caso contrario deixa a porra do jeito que ta
            model[key] = path;
          }
        } else {
          model[key] = null;
        }
      });
    }
    return model;
  }*/

  /**
   * Realiza o processo de databinding de um determinado component
   * para um modelo qualquer
   * @param value -> valor a ser usado no processo
   * @param clazz -> modelo para fazer o databinding
   *
   * @return instance -> instancia de modelo com o databinding já realizado!
   */
  export function databinding(value: any, clazz): object {
    return plainToClass(clazz, value);
  }

  export function serializeOpts(): TransformOptions {
    return {toPlainOnly: true};
  }

  export function serialize(model: Model): string {
    return isNullOrUndefined(model) ? null : model.id;
  }

  export function deserializeOpts(): TransformOptions {
    return {toClassOnly: true};
  }

  export function deserialize(value: string | any, type): Model {
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
    } else if (isObject(value)) {
      //se chegou aqui, quer dizer que é um objeto
      //realizando o databinding necessário
      model = databinding(value as any, type) as Model;
    } else {
      model = value;
    }
    return model;
  }
}
