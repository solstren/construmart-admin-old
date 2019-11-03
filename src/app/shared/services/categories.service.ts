import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // @ts-ignore
  public getCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '');
  }

  public postCategory(data: Object) {
    return this.http.post(this.baseUrl + 'categories', data);
  }
}
