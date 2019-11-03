import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  modalToggle(status: boolean, id) {
    if (status === true) {
      $(id).modal('show');
    } else {
      $(id).modal('hide');
    }
  }
}
