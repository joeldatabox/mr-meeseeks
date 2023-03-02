import {TransformOptions} from "class-transformer";
import {isNullOrUndefined} from "../../sr-utils";

export enum Domain {
  /**
   * Qualquer registro que estiver marcado como {@link PRIVATE} somente quem criou e seus supervisores poderá visualizar
   */
  PRIVATE,
  /**
   * Qualquer registro que estiver marcado como {@link RESTRICTED} somente quem criou e participantes do grupo de trabalho e seus supervisores poderá visualizar
   */
  RESTRICTED,
  /**
   * Qualquer registro que estiver marcado como {@link PUBLIC} qualquer pessoa poderá visualizar o registro
   */
  PUBLIC
}

export namespace Domain {
  export function getValues(): Array<Domain> {
    const array = [];
    for (const item in Domain) {
      if (!isNaN(Number(item))) {
        array.push(Domain[item]);
      }
    }
    return array;
  }

  export function serializeOpts(): TransformOptions {
    return {toPlainOnly: true};
  }

  export function serialize(domain: Domain | string): string {
    if (isNullOrUndefined(domain)) return null;
    switch (domain) {
      case Domain.PUBLIC:
      case Domain[Domain.PUBLIC]:
        return Domain[Domain.PUBLIC];
      case Domain.RESTRICTED:
      case Domain[Domain.RESTRICTED]:
        return Domain[Domain.RESTRICTED];
      case Domain.PRIVATE:
      case Domain[Domain.PRIVATE]:
        return Domain[Domain.PRIVATE];
      default:
        throw new Error("Dominio não reconhecido [" + domain + "]");
    }
  }

  export function deserializeOpts(): TransformOptions {
    return {toClassOnly: true};
  }

  export function deserialize(domain: Domain | string): Domain {
    if (isNullOrUndefined(domain)) return null;
    switch (domain) {
      case Domain.PUBLIC:
      case Domain[Domain.PUBLIC]:
        return Domain.PUBLIC;
      case Domain.RESTRICTED:
      case Domain[Domain.RESTRICTED]:
        return Domain.RESTRICTED;
      case Domain.PRIVATE:
      case Domain[Domain.PRIVATE]:
        return Domain.PRIVATE;
      default:
        throw new Error("Status não reconhecido [" + domain + "]");
    }
  }

  export function compare(domainA: any, domainB: any): boolean {
    let domain = null;
    let otherDomain = null;
    try {
      domain = Domain.deserialize(domainA);
    } catch (e) {
    }
    try {
      otherDomain = Domain.deserialize(domainB);
    } catch (e) {
    }
    return domain === otherDomain;
  }
}
