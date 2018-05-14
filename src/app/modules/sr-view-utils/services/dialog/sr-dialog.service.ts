import {Injectable, ViewContainerRef} from "@angular/core";
import {IAlertConfig, IConfirmConfig, TdDialogService} from "@covalent/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

/**
 * @author Joel Rodrigues Moreira
 * e-mail: <a href="mailto:joel.databox@gmail.com">joel.databox@gmail.com</a>
 */
@Injectable()
export class SrDialogService {

  constructor(private _dialogService: TdDialogService) {
  }

  public confirmDialog(): SrConfirmDialog {
    return new SrConfirmDialog(this._dialogService);
  }

  public confirmDeleteDialog(): SrConfirmDialog {
    return this.confirmDialog()
      .message("Deseja realmente exluir este registro?")
      .cancelButton("Cancelar")
      .acceptButton("Excluir");
  }

  public showMessageDialog(): SrShowMessageDialog {
    return new SrShowMessageDialog(this._dialogService);
  }
}

export class SrConfirmDialog {
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

  message(message: string): SrConfirmDialog {
    this.config.message = message;
    return this;
  }

  title(title: string): SrConfirmDialog {
    this.config.title = title;
    return this;
  }

  disableClose(disable: boolean): SrConfirmDialog {
    this.config.disableClose = disable;
    return this;
  }

  viewContainerRef(view: ViewContainerRef): SrConfirmDialog {
    this.config.viewContainerRef = view;
    return this;
  }

  acceptButton(acceptButton: string): SrConfirmDialog {
    this.config.acceptButton = acceptButton;
    return this;
  }

  cancelButton(cancelButton: string): SrConfirmDialog {
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

export class SrShowMessageDialog {
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

  message(message: string): SrShowMessageDialog {
    this.config.message = message;
    return this;
  }

  title(title: string): SrShowMessageDialog {
    this.config.title = title;
    return this;
  }

  disableClose(disable: boolean): SrShowMessageDialog {
    this.config.disableClose = disable;
    return this;
  }

  viewContainerRef(view: ViewContainerRef): SrShowMessageDialog {
    this.config.viewContainerRef = view;
    return this;
  }

  closeButton(closeButton: string): SrShowMessageDialog {
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
