import {Observable, throwError as observableThrowError} from "rxjs";
import {Exclude} from "class-transformer";
import {HttpErrorResponse} from "@angular/common/http";
import {isNotNullOrUndefined} from "../../../sr-utils/commons/sr-commons.model";
import {SrLogg} from "../../../sr-utils/logger/sr-logger";

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
  statusCode: number;
  reasonPhrase: string;
  statusName: string;

  constructor(value?: any) {
    if (isNotNullOrUndefined(value)) {
      this.statusCode = value.statusCode;
      this.reasonPhrase = value.reasonPhrase;
      this.statusName = value.statusName;
    }
  }
}

function connectionError() {
  const message: ErrorMessage = new ErrorMessage();
  message.status = new HttpStatus({code: 504, reasonPhrase: "Gateway Timeout", statusName: "TIMEOUT"});
  message.message = "Parece que você está sem conexão com o servidor";
  return message;
}

export function throwErrorMessage(response: HttpErrorResponse, log?: SrLogg): Observable<any> {
  let throws = null;
  // @ts-ignore
  if (response.constructor.name === "TypeError") {
    throws = connectionError();
    // @ts-ignore
  } else if (response.constructor.name === "Error") {
    throws = new ErrorMessage();
    // @ts-ignore
    throws.message = (response as Error).stack;
    throws.details = response;
  } else if (response.headers.has("error-message")) {
    const error = new ErrorMessage(response.error);
    throws = new ErrorMessage(response.error);
  } else if (response.status === 504) {
    const message: ErrorMessage = new ErrorMessage();
    message.status = new HttpStatus({code: 504, reasonPhrase: "Gateway Timeout", statusName: "TIMEOUT"});
    message.message = "Parece que você está sem conexão com o servidor";
    throws = message;
  } else {
    throws = new ErrorMessage();
    throws.message = "Server error";
    throws.details = response.error;
  }
  if (isNotNullOrUndefined(log)) {
    log.e("error ocurred", throws);
  }
  return observableThrowError(throws);
}
