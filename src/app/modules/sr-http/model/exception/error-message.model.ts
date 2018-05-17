
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Exclude} from "class-transformer";
import {HttpErrorResponse} from "@angular/common/http";
import {isNotNullOrUndefined, SrLogg} from "../../../sr-utils";

export class ErrorMessage {
  status: HttpStatus;
  message: string;
  objectName: string;
  details: any;

  constructor(value?: any) {
    if (isNotNullOrUndefined(value)) {
      this.status = new HttpStatus(value.status);
      this.message = value.message;
      this.objectName = value.objectName;
      this.details = value.details;
    }
  }

  @Exclude()
  public static of(error: any): ErrorMessage {
    return new ErrorMessage(error);
  }
}

export class HttpStatus {
  code: number;
  reasonPhrase: string;
  statusName: string;

  constructor(value?: any) {
    if (isNotNullOrUndefined(value)) {
      this.code = value.code;
      this.reasonPhrase = value.reasonPhrase;
      this.statusName = value.statusName;
    }
  }
}

export function throwErrorMessage(response: HttpErrorResponse, log?: SrLogg): Observable<any> {
  let throws = null;
  if (response.headers.has("error-message")) {
    const error = new ErrorMessage(response.error);
    throws = new ErrorMessage(response.error);
  } else if (response.status === 504) {
    const message: ErrorMessage = new ErrorMessage();
    message.status = new HttpStatus({code: 504, reasonPhrase: "Gateway Timeout", statusName: "TIMEOUT"});
    message.message = "Parece que você está sem conexão com o servidor";
    throws = message;
  } else {
    throws = (response.error || "Server error");
  }
  if (isNotNullOrUndefined(log)) {
    log.e("error ocurred", throws);
  }
  return observableThrowError(throws);
}
