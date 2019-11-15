import { Injectable } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Injectable()
export class NotificationService {

  constructor() { }

  public success(msg) {
    var bar = new $.peekABar({
      autohide: true,
      html: msg,
      backgroundColor: '#72cdce'
    });
    bar.show();
  }

  public error(msg) {
    var bar = new $.peekABar({
      autohide: true,
      html: msg,
      backgroundColor: '#d9534f'
    });
    bar.show();
  }

}
