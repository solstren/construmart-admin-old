import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public login(data: object): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'user/authenticate', data);
  }
}
