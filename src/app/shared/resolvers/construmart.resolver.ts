import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CategoriesService} from '../services/categories.service';

@Injectable()
export class CategoriesResolver implements Resolve<Observable<any[]>> {
  constructor(private categoriesService: CategoriesService) {}
  public resolve(): Observable<any[]> {
    return this.categoriesService.getCategories();
  }
}
