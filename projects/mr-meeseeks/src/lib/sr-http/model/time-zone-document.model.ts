export class TimeZoneDocument {
  /**
   * Deve conter informações do timezone corrente do registro
   */
  currentTimeZone: string;

  /**
   * Deve conter informações do timezone de criação do registro
   */
  createTimeZone: string;

  /**
   * Deve conter informações do timezone corrente do registro por parte do servidor
   */
  serverCurrentTimeZone: string;

  /**
   * Deve conter informações do timezone de criação do registro por parte do servidor
   */
  serverCreteTimeZone: string;
}
