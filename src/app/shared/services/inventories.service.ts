import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getInventories(): Observable<any> {
    return this.http.get(this.baseUrl + 'inventories');
  }

  public postInventory(data: Object) {
    return this.http.post(this.baseUrl + 'inventories', data);
  }

  public deleteInventory(id: number) {
    return this.http.delete(this.baseUrl + 'inventories/' + id);
  }

  public updateInventory(data: any, id: number) {
    return this.http.put(this.baseUrl + 'inventories/' + id, data);
  }
}
