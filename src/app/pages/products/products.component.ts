import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilitiesService} from '../../shared/services/utilities.service';
import { ProductsService } from '../../shared/services/products.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {CategoriesService} from '../../shared/services/categories.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};

  saveFormMode: string;
  saveFormButton: string;
  product: any = {};
  products: any = [];
  categories: any = [];
  productPhoto: any = null;

  productUpdateId: number;
  productDeleteId: number;

  constructor(private utils: UtilitiesService, private productsService: ProductsService, private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.saveFormMode = 'New';
    this.saveFormButton = 'Save';

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      language: {
        emptyTable: 'No data available'
      },
      ajax: (request: any, callback) => {
        this.productsService.getProducts(request).subscribe(data => {``
          this.products = data.data.products;
          callback({
            recordsTotal: data.recordsTotal,
            recordsFiltered: data.recordsFiltered,
            data: [],
          });
        });
      }
    };

    $('#img-placeholder-2').imagepreview({
      input: '[name="imageFile"]',
      reset: '#productPhotoClear',
      preview: '.product-photo-placeholder'
    });
  }

  saveProduct(mode: any) {
    if ($('#form-products').smkValidate()) {
      this.utils.showLoading();
      const formData = new FormData($('#form-products')[0]);
      if (mode === 'New') {
        this.productsService.postProduct(formData).subscribe((response: any) => {
          console.log(response);
          if (response.status === true) {
            this.utils.hideLoading();
            this.product = {};
            this.hideModal();
            this.reloadTable();
            $('#productPhotoClear').click();
            toastr.success(response.message);
          } else {
            this.utils.hideLoading();
            toastr.error(response.message);
          }
        }, error => {
          toastr.error('Something went wrong.');
          this.utils.hideLoading();
        });
      } else {
        this.productsService.updateProduct(formData, this.productUpdateId).subscribe((response: any) => {
          if (response.status === true) {
            this.utils.hideLoading();
            this.utils.modalToggle(false, '#product-modal');
            this.reloadTable();
            toastr.success(response.message);
          } else {
            this.utils.hideLoading();
            this.utils.modalToggle(false, '#product-modal');
            toastr.error(response.message);
          }

        }, error => {
          toastr.error('Something went wrong');
          this.utils.modalToggle(false, '#product-modal');
          this.utils.hideLoading();
        });
      }

    }

  }

  showModal(data: any = false) {
    if (data) {
      this.product = data;
      this.productPhoto = environment.baseUrl + 'uploads/' + this.product.imageName;
      this.saveFormButton = 'Update';
      this.saveFormMode = 'Edit';
      this.productUpdateId = data.id;
    } else {
      this.product = {};
      this.saveFormMode = 'New';
      this.saveFormButton = 'Save';
    }
    this.utils.modalToggle(true, '#product-modal');
  }

  hideModal() {
    this.utils.modalToggle(false, '#product-modal');
  }

  showDeleteModal(id: number) {
    this.productDeleteId = id;
    this.utils.modalToggle(true, '#delete-product-modal');
  }

  deleteProduct(id: number) {
    this.utils.showLoading();
    this.productsService.deleteProduct(id).subscribe(
      (response: any) => {
        if (response.status === true) {
          this.utils.hideLoading();
          this.reloadTable();
          this.utils.modalToggle(false, '#delete-product-modal');
          toastr.success('Product deleted successfully');
        } else {
          this.utils.hideLoading();
          this.utils.modalToggle(false, '#delete-product-modal');
          toastr.error('Something went wrong');
        }

      }, error => {
        this.utils.hideLoading();
        this.utils.modalToggle(false, '#delete-product-modal');
        toastr.error('Something went wrong');
      }
    );
  }

  clear() {
    this.product = {};
    this.productPhoto = null;
    $('#productPhotoClear').click();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  reloadTable(): void{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

}
