export interface NumberOptions {
  /**
   * o que exibirá antes do valor. O padrão é '$'.
   */
  prefix?: string;
  /**
   * o que exibirá após o valor. O padrão é ''.
   */
  suffix?: string;
  /**
   * separar ou não as casas de milhares. O padrão é true.
   */
  includeThousandsSeparator?: boolean;
  /**
   * Caractere com o qual separará a casa de milhares. Padrão é '.'.
   */
  thousandsSeparatorSymbol?: string;
  /**
   * Se permite ou não que o usuário insira uma fração com o valor. Padrão é false.
   */
  allowDecimal?: string;
  /**
   * caractere que funcionará como um ponto decimal. Padrões é '.'
   */
  decimalSymbol?: string;
  /**
   * quantos dígitos para permitir após o decimal. Padrão é 2
   */
  decimalLimit?: number;
  /**
   * limita o comprimento do número inteiro. Padrao é null ou seja é ilimitado
   */
  integerLimit?: number;
  /**
   * se deve ou não incluir sempre um ponto decimal e um espaço reservado para dígitos decimais após o inteiro. Padrao pe false.
   */
  requireDecimal?: boolean;
  /**
   * se deve ou não permitir números negativos. Padrões é false
   */
  allowNegative?: boolean;
  /**
   * se permite ou não zeros à esquerda. Padrões é true
   */
  allowLeadingZeroes?: boolean;

}
