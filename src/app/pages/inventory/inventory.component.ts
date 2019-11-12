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
  dtOptions: any = {};

  saveFormMode: string;
  saveFormButton: string;
  inventory: any = {};
  inventories: any = {};
  inventoryPhoto: any = null;

  inventoryUpdateId: number;
  inventoryDeleteId: number;

  constructor(private utils: UtilitiesService, private inventoriesService: InventoriesService, private route: ActivatedRoute, private consts: ConstantsService) { }

  ngOnInit() {

    this.inventories = this.route.snapshot.data['inventories'].body;
    console.log(this.inventories);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (request: any, callback) => {
        this.inventoriesService.getInventories().subscribe(data => {
          this.inventories = data.body;
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
      console.log(this.inventory);
        this.inventoriesService.postInventory(this.inventory).subscribe((response: any) => {
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
    console.log(data);
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

  clear() {
    this.inventory = {};
    this.inventoryPhoto = null;
    $('#inventoryPhotoClear').click();
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
