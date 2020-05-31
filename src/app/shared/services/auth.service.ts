import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(data: object) {
    return this.http.post(this.baseUrl + 'customer', data);
  }

  verifyOtp(data: object) {
    return this.http.post(this.baseUrl + 'customer/verify', data);
  }

  login(data: object) {
    return this.http.post(this.baseUrl + 'user/authenticate', data);
  }

  initiateResetOTP(data: object) {
    return this.http.post(this.baseUrl + 'user/reset-password/initiate', data);
  }

  completeResetOTP(data: object) {
    return this.http.post(this.baseUrl + 'user/reset-password/complete', data);
  }

  resendOTP(data: object) {
    return this.http.post(this.baseUrl + 'user/resend-otp', data);
  }

  changePassword(data: object) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.token)}` });
    const options = { headers };

    return this.http.post(this.baseUrl + 'user/change-password', data, options);
  }
}
