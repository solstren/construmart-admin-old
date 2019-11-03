import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilitiesService} from '../../shared/services/utilities.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {CategoriesService} from '../../shared/services/categories.service';

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
  category: any = {};

  constructor(private utilityService: UtilitiesService, private categoriesService: CategoriesService) { }

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
      input: '[name="imageFile"]',
      reset: '',
      preview: '.category-photo-placeholder'
    });
  }

  saveCategory() {
    const formData = new FormData($('#form-categories')[0]);

    this.categoriesService.postCategory(formData).subscribe((response: any) => {
      if (response.code === 201) {
        console.log('yaay');
        toastr.info('sadad');
      } else {
        toastr.info('sadad');
        console.log('error');
      }
      toastr.info('sadad');
    });
  }

  showModal() {
    this.utilityService.modalToggle(true, '#category-modal');
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }



}
