import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilitiesService} from '../../shared/services/utilities.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};

  saveFormMode: string;
  saveFormButton: string;
  category: any;

  constructor(private utilityService: UtilitiesService) { }

  ngOnInit() {
    this.saveFormMode = 'New';
    this.saveFormButton = 'Save';

    this.dtOptions = {
      pagingType: 'full_members',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (request: any, callback) => {

      }
    };

    $('#img-placeholder-2').imagepreview({
      input: '[name="categoryPhoto"]',
      reset: '',
      preview: '.category-photo-placeholder'
    });
  }

  saveCategory() {

  }

  showModal() {
    this.utilityService.modalToggle(true, '#category-modal');
  }



  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }



}
