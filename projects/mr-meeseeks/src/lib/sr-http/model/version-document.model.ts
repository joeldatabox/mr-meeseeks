export class VersionDocument {
  /**
   * Nome do cliente que criou o documento
   */
  originNameClientCreate: string;

  /**
   * Versão do cliente que criou o documento
   */
  originVersionClientCreate: string;

  /**
   * Versão do servidor em que foi criado o documento
   */
  serverVersionCreate: string;

  /**
   * Nome do cliente que fez a atualização do documento
   */
  originNameClientLastUpdate: string;

  /**
   * Versão do cliente que fez a ultima atualização do documento
   */
  originVersionClientLastUpdate: string;

  /**
   * Versão do servidor em que foi atualizado o documento
   */
  serverVersionLastUpdate: string;
}
