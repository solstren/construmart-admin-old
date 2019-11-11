import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ProductsComponent} from './pages/products/products.component';
import {CategoriesComponent} from './pages/categories/categories.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {InventoryComponent} from './pages/inventory/inventory.component';
import {DriversComponent} from './pages/drivers/drivers.component';
import {CategoriesResolver, ProductsResolver} from './shared/resolvers/construmart.resolver';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: {
      products: ProductsResolver
    }
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    resolve: {
      categories: CategoriesResolver
    }
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'drivers',
    component: DriversComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
