import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private dataService: DataService) { }

  public getInventories(req): Observable<any> {
    return this.dataService.getList(this.baseUrl + 'inventories', req);
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

  public inventoryHistory(req): Observable<any> {
    return this.dataService.getList(this.baseUrl + 'inventory-history', req);
  }
}
