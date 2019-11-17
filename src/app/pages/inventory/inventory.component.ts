import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {UtilitiesService} from '../../shared/services/utilities.service';
import {ActivatedRoute} from '@angular/router';
import {ConstantsService} from '../../shared/services/constants.service';
import {environment} from '../../../environments/environment';
import {InventoriesService} from '../../shared/services/inventories.service';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  dtTriggerTwo: Subject<any> = new Subject();
  dtOptions: any = {};
  dtOptionsTwo: any = {};

  inventory: any = {};
  inventoryObj: any = {};
  inventories: any = [];
  inventoryHistory: any = [];
  inventoryPhoto: any = null;

  inventoryUpdateId: number;
  inventoryDeleteId: number;

  constructor(private utils: UtilitiesService, private inventoriesService: InventoriesService, private route: ActivatedRoute, private consts: ConstantsService) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      language: {
        emptyTable: 'No data available'
      },
      ajax: (request: any, callback) => {
        this.inventoriesService.getInventories(request).subscribe(data => {
          console.log(data);
          this.inventories = data.data.inventory;
          callback({
            recordsTotal: data.recordsTotal,
            recordsFiltered: data.recordsFiltered,
            data: [],
          });
        });
      }
    };

    this.dtOptionsTwo = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      language: {
        emptyTable: 'No data available'
      },
      ajax: (request: any, callback) => {
        this.inventoriesService.inventoryHistory(request).subscribe(data => {
          this.inventoryHistory = data.data.inventoryHistory;
          callback({
            recordsTotal: data.recordsTotal,
            recordsFiltered: data.recordsFiltered,
            data: [],
          });
        });
      }
    };
  }

  updateInventory() {
    if ($('#form-inventories').smkValidate()) {
      this.utils.showLoading();
      Object.assign(this.inventoryObj, this.inventory);
      delete this.inventoryObj.dateCreated;
      delete this.inventoryObj.dateUpdated;
      delete this.inventoryObj.productName;
      delete this.inventoryObj.id;

      this.inventoryObj.currentPrice = parseInt(this.inventoryObj.currentPrice);
      this.inventoryObj.initialPrice = parseInt(this.inventoryObj.initialPrice);
      this.inventoryObj.productId = parseInt(this.inventoryObj.productId);
      this.inventoriesService.updateInventory(this.inventoryObj, this.inventoryObj.productId).subscribe((response: any) => {
          if (response.status === true) {
            this.utils.hideLoading();
            this.inventory = {};
            this.hideModal();
            this.reloadTable();
            toastr.success(response.message);
          } else {
            this.utils.hideLoading();
            toastr.error(response.message);
          }
        }, error => {
          toastr.error('Something went wrong.');
          this.utils.hideLoading();
        });
    }
  }

  showModal(data: any) {
      this.inventory = data;
      this.inventoryUpdateId = data.id;
    this.utils.modalToggle(true, '#inventory-modal');
  }

  hideModal() {
    this.utils.modalToggle(false, '#inventory-modal');
  }

  showDeleteModal(id: number) {
    this.inventoryDeleteId = id;
    this.utils.modalToggle(true, '#delete-inventory-modal');
  }

  deleteInventory(id: number) {
    this.utils.showLoading();
    this.inventoriesService.deleteInventory(id).subscribe(
      (response: any) => {
        if (response.status === true) {
          this.reloadTable();
          this.utils.hideLoading();
          this.utils.modalToggle(false, '#delete-inventory-modal');
          toastr.success('Inventory deleted successfully');
        } else {
          this.utils.hideLoading();
          this.utils.modalToggle(false, '#delete-inventory-modal');
          toastr.error('Something went wrong');
        }

      }, error => {
        this.utils.hideLoading();
        this.utils.modalToggle(false, '#delete-inventory-modal');
        toastr.error('Something went wrong');
      }
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.dtTriggerTwo.next();
  }

  reloadTable(): void{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

}
