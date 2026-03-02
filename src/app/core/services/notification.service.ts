import { Injectable, OnInit } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifier: any = alertify;
  constructor() {

    // dialogs defaults
    alertify.defaults.autoReset = true;
    alertify.defaults.basic = false;
    alertify.defaults.closable = true;
    alertify.defaults.closableByDimmer = true;
    alertify.defaults.frameless = false;
    alertify.defaults.maintainFocus = true; // <== global default not per instance; applies to all dialogs
    alertify.defaults.maximizable = true;
    alertify.defaults.modal = true;
    alertify.defaults.movable = true;
    alertify.defaults.moveBounded = false;
    alertify.defaults.overflow = true;
    alertify.defaults.padding = true;
    alertify.defaults.pinnable = true;
    alertify.defaults.pinned = true;
    alertify.defaults.preventBodyShift = false; // <== global default not per instance; applies to all dialogs
    alertify.defaults.resizable = true;
    alertify.defaults.startMaximized = false;

    //override theme settings
    alertify.defaults.transition = 'slide'; //pulse|zoom|slide;
    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";

    //override glossary values
    alertify.defaults.glossary.title = 'Thông báo';
    alertify.defaults.glossary.ok = 'Xác nhận';
    alertify.defaults.glossary.cancel = 'Hủy';

  }


  printSuccessMessage(message: string) {
    this._notifier.set('notifier','position', 'top-center');
    this._notifier.success(message);
  }

  printErrorMessage(message: string) {
    this._notifier.set('notifier','position', 'top-center');
    this._notifier.error(message);
  }

  printConfirmationDialog(message: string, okCallback: () => any) {
    this._notifier.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

}
