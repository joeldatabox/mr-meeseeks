import {Injectable, ViewContainerRef} from "@angular/core";
import {IAlertConfig, IConfirmConfig, TdDialogService} from "@covalent/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class MrDialogService {

  constructor(private _dialogService: TdDialogService) {
  }

  public confirmDialog(): MrConfirmDialog {
    return new MrConfirmDialog(this._dialogService);
  }

  public confirmDeleteDialog(): MrConfirmDialog {
    return this.confirmDialog()
      .message("Deseja realmente exluir este registro?")
      .cancelButton("Cancelar")
      .acceptButton("Excluir");
  }

  public showMessageDialog(): MrShowMessageDialog {
    return new MrShowMessageDialog(this._dialogService);
  }
}

export class MrConfirmDialog {
  config: IConfirmConfig;

  constructor(private _dialogService: TdDialogService) {
    this.config = {
      message: "Informe uma mensagem",
      title: "Atenção",
      disableClose: false,
      viewContainerRef: null,
      acceptButton: "Sim",
      cancelButton: "Não"
    };
  }

  message(message: string): MrConfirmDialog {
    this.config.message = message;
    return this;
  }

  title(title: string): MrConfirmDialog {
    this.config.title = title;
    return this;
  }

  disableClose(disable: boolean): MrConfirmDialog {
    this.config.disableClose = disable;
    return this;
  }

  viewContainerRef(view: ViewContainerRef): MrConfirmDialog {
    this.config.viewContainerRef = view;
    return this;
  }

  acceptButton(acceptButton: string): MrConfirmDialog {
    this.config.acceptButton = acceptButton;
    return this;
  }

  cancelButton(cancelButton: string): MrConfirmDialog {
    this.config.cancelButton = cancelButton;
    return this;
  }

  show(): Observable<boolean> {
    return this._dialogService
      .openConfirm(this.config)
      .afterClosed()
      .map((resp: boolean) => resp);
  }
}

export class MrShowMessageDialog {
  config: IAlertConfig;

  constructor(private _dialogService: TdDialogService) {
    this.config = {
      message: "Informe uma mensagem",
      title: "Atenção",
      disableClose: false,
      viewContainerRef: null,
      closeButton: "Fechar"
    };
  }

  message(message: string): MrShowMessageDialog {
    this.config.message = message;
    return this;
  }

  title(title: string): MrShowMessageDialog {
    this.config.title = title;
    return this;
  }

  disableClose(disable: boolean): MrShowMessageDialog {
    this.config.disableClose = disable;
    return this;
  }

  viewContainerRef(view: ViewContainerRef): MrShowMessageDialog {
    this.config.viewContainerRef = view;
    return this;
  }

  closeButton(closeButton: string): MrShowMessageDialog {
    this.config.closeButton = closeButton;
    return this;
  }

  show(): Observable<boolean> {
    return this._dialogService
      .openAlert(this.config)
      .afterClosed()
      .map((resp: boolean) => resp);
  }
}
