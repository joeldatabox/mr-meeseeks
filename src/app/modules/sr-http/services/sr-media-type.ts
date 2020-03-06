/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
export class SrMediaType {
  public static readonly ALL = "*/*";
  public static readonly APPLICATION_JSON = "application/json";
  public static readonly APPLICATION_JSON_UTF8 = "application/json;charset=UTF-8";
  public static readonly APPLICATION_JSON_ANY = SrMediaType.APPLICATION_JSON + "," + SrMediaType.APPLICATION_JSON_UTF8;
  public static readonly APPLICATION_PDF = "application/pdf";
  public static readonly TEXT_PLAIN = "text/plain";
}

export enum SrResponseType {
  ARRAY_BUFFER = "arraybuffer",
  BLOB = "blob",
  JSON = "json",
  TEXT = "text"
}

export enum SrHttpObserve {
  BODY = "body",
  EVENTS = "events",
  RESPONSE = "response"
}
