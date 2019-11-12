import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CategoriesService} from '../services/categories.service';
import {ProductsService} from '../services/products.service';
import {InventoriesService} from '../services/inventories.service';

@Injectable()
export class CategoriesResolver implements Resolve<Observable<any[]>> {
  constructor(private categoriesService: CategoriesService) {}
  public resolve(): Observable<any[]> {
    return this.categoriesService.getCategories();
  }
}

@Injectable()
export class ProductsResolver implements Resolve<Observable<any[]>> {
  constructor(private productsService: ProductsService) {}
  public resolve(): Observable<any[]> {
    return this.productsService.getProducts();
  }
}

@Injectable()
export class InventoriesResolver implements Resolve<Observable<any[]>> {
  constructor(private inventoriesService: InventoriesService) {}
  public resolve(): Observable<any[]> {
    return this.inventoriesService.getInventories();
  }
}
