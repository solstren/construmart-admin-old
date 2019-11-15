import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private dataService: DataService) { }

  public getProducts(req): Observable<any> {
    return this.dataService.getList(this.baseUrl + 'products', req);
  }

  public postProduct(data: Object) {
    return this.http.post(this.baseUrl + 'products', data);
  }

  public deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  public updateProduct(data: any, id: number) {
    return this.http.put(this.baseUrl + 'products/' + id, data);
  }
}
