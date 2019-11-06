import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<any> {
    return this.http.get(this.baseUrl + 'categories');
  }

  public postCategory(data: Object) {
    return this.http.post(this.baseUrl + 'categories', data);
  }

  public deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + 'categories/' + id);
  }

  public updateCategory(data: any, id: number) {
    console.log(data);
    return this.http.put(this.baseUrl + 'categories/' + id, data);
  }
}
