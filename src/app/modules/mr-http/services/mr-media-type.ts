/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
export class MediaType {
  public static readonly ALL = "*/*";
  public static readonly APPLICATION_JSON = "application/json";
  public static readonly APPLICATION_JSON_UTF8 = "application/json;charset=UTF-8";
  public static readonly APPLICATION_JSON_ANY = MediaType.APPLICATION_JSON + "," + MediaType.APPLICATION_JSON_UTF8;
  public static readonly TEXT_PLAIN = "text/plain";
}
