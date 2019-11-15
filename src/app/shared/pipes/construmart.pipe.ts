import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'cm_money_format'})
export class MoneyFormat implements PipeTransform {
  transform(value: number, args: string[]): any {
    if (!value) return '-';
    return parseFloat(value + '').toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
}
