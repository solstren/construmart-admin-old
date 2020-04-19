import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CategoriesService} from '../services/categories.service';
import {ProductsService} from '../services/products.service';

@Injectable()
export class CategoriesResolver implements Resolve<Observable<any[]>> {
  constructor(private categoryService: CategoriesService) { }
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    let req: any = { };
    req.start = 0;
    req.length = 0;
    return this.categoryService.getCategories(req);
  }
}

@Injectable()
export class TagsResolver implements Resolve<Observable<any[]>> {
  constructor(private productServices: ProductsService) { }
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {

    return this.productServices.getTags();
  }
}
