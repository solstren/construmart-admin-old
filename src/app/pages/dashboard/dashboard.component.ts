import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../shared/services/products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tags: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
