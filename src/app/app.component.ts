import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {UtilitiesService} from './shared/services/utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'construmart';
  public url: string;


  constructor(private router: Router, private utils: UtilitiesService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  /*// tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

  }*/

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.url = event.url;
      this.utils.showLoading();
    }
    if (event instanceof NavigationEnd) {
      this.utils.hideLoading();

    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.utils.hideLoading();
      // console.log(this.url);
    }
    if (event instanceof NavigationError) {
      this.utils.hideLoading();
      // console.log(this.url);
    }
  }
}
