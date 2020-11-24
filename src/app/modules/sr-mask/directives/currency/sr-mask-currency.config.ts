export interface CurrencyMaskConfig {
  /**
   * Alinhamento do texto na entrada. (padrão: right)
   */
  align: "left" | "right";
  /**
   * Se true, pode inserir valores negativos. (padrão: false)
   */
  allowNegative: boolean;

  allowZero: boolean;

  /**
   * Separador de decimais (padrão: ',')
   */
  decimal: string;

  /**
   * Número de casas decimais (padrão: 2)
   */
  precision: number;

  /**
   * Prefixo de dinheiro (padrão: '')
   */
  prefix: string;

  /**
   * Sufixo de dinheiro (padrão: '')
   */
  suffix: string;

  /**
   * Separador de milhares (padrão: '.')
   */
  thousands: string;

  /**
   * Quando verdadeiro, o valor do campo limpo será nulo, quando falso o valor será 0
   */
  nullable: boolean;

  /**
   * O valor mínimo (padrão: indefinido)
   */
  min?: number;

  /**
   * O valor máximo (padrão: indefinido)
   */
  max?: number;
  /**
   * Determina como lidar com os números conforme o usuário os digita (padrão: FINANCIAL)
   */
  inputMode?: CurrencyMaskInputMode;

}

export enum CurrencyMaskInputMode {
  FINANCIAL,
  NATURAL,
}
