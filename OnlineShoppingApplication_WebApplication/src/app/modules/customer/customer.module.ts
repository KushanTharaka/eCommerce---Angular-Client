import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerProductsComponent } from './customerComponents/customer-products/customer-products.component';
import { CustomerShoppingCartComponent } from './customerComponents/customer-shopping-cart/customer-shopping-cart.component';
import { CustomerDashboardComponent } from './customerComponents/customer-dashboard/customer-dashboard.component';
import { CustomerNavbarComponent } from './customerComponents/customer-navbar/customer-navbar.component';


@NgModule({
  declarations: [
    CustomerProductsComponent,
    CustomerShoppingCartComponent,
    CustomerDashboardComponent,
    CustomerNavbarComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
