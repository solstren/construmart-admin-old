import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
// @ts-ignore
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

declare var toastr: any;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = environment.baseUrl;

  user: any;

  urlVisited: any;

  constructor(private http: HttpClient) {
  }

  public getList(url: string, request: any): Observable<any> {
    if (request == null) {
    } else {
      const page = request.start; // > 0 ? (request.start / request.length) : request.start;
      url += `?offset=${page}&limit=${request.length}&`;
      // const columns = request.columns;

      /*if (request.order) {
        let n = 0;
        request.order.forEach((order) => {
          if (n < 1)
            url += `sort-field=${columns[order.column].name}&sort-order=${order.dir.toUpperCase()}&`;
          n++;
        });
      }*/

      /*request.filters.forEach((filter) => {
        if (filter.value) {
          url += `${filter.name}like=${filter.value}&`;
        }
      });*/

      /*if (request.hasOwnProperty('search') && request.search.value) {
        url += `filter=${request.search.value}&`;
      }*/

      /*if (request.extra) {
        JSON.parse(request.extra).map((obj, index) => {
          url += `${obj.name}=${obj.value}&`;
        });
      }*/
    }

    return this.http.get(url).pipe(map(res => {
      const data: any = res;
      console.log(data);
      if (data.status == true) {
        return {
          recordsTotal: data.body.totalCount,
          recordsFiltered: data.body.totalCount,
          data: data.body,
          draw: 5
        };
      } else {
        toastr.error(data.message);
        return {
          recordsTotal: 0,
          recordsFiltered: 0
        };
      }
    }));
  }
}
