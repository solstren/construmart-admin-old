import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';
import {UtilitiesService} from './shared/services/utilities.service';
import {CategoriesService} from './shared/services/categories.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
// import {CategoriesResolver, InventoriesResolver, ProductsResolver} from './shared/resolvers/construmart.resolver';
import {ConstantsService} from './shared/services/constants.service';
import {NotificationService} from './shared/services/notification.service';
import {MoneyFormat} from './shared/pipes/construmart.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoriesComponent,
    ProductsComponent,
    OrdersComponent,
    DriversComponent,
    LoginComponent,
    RegisterComponent,
    InventoryComponent,
    MoneyFormat
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UtilitiesService,
    CategoriesService,
    // CategoriesResolver,
    ConstantsService,
    NotificationService,
    // ProductsResolver,
    // InventoriesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
