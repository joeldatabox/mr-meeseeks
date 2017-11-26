import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {isNullOrUndefined} from "util";


/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class MrSnackService {

  constructor(private snack: MatSnackBar) {
  }

  public show(message: string, labelExit?: string, durationMessage?: number): void {
    if (isNullOrUndefined(labelExit)) labelExit = "Fechar";
    if (isNullOrUndefined(durationMessage)) durationMessage = 3000;
    this.snack.open(message, labelExit, {
      duration: durationMessage
    });
  }
}
