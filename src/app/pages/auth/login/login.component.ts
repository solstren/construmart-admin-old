import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {UtilitiesService} from '../../../shared/services/utilities.service';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  date: any;
  credentials: any = {};
  constructor(private authService: AuthService, private utilService: UtilitiesService) { }

  ngOnInit() {
    this.credentials.role = 1;
    this.date = new Date().getFullYear();
  }

  login() {
    if ((this.credentials.email == '' || this.credentials.email == null) || (this.credentials.password == '' || this.credentials.password == null)) {
      toastr.error('All fields are required');
    } else {
      this.utilService.showLoading();
      // console.log(this.credentials);
      this.authService.login(this.credentials).subscribe((data: any) => {
        if (data.status) {
          console.log(data);
          toastr.success('Login Successful');
          localStorage.setItem('token', JSON.stringify(data.body.token));
          location.href = 'dashboard';
        } else {
          this.utilService.hideLoading();
          toastr.error('Something went wrong, Try again');
        }
      }, error => {
        this.utilService.hideLoading();
        toastr.error(error.error.body.message);
      });
    }
  }

}
