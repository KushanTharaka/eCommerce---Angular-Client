import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerProductsComponent } from './customerComponents/customer-products/customer-products.component';
import { CustomerShoppingCartComponent } from './customerComponents/customer-shopping-cart/customer-shopping-cart.component';
import { CustomerDashboardComponent } from './customerComponents/customer-dashboard/customer-dashboard.component';
import { CustomerNavbarComponent } from './customerComponents/customer-navbar/customer-navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerPurchaseHistoryComponent } from './customerComponents/customer-purchase-history/customer-purchase-history.component';
import { CustomerCheckoutComponent } from './customerComponents/customer-checkout/customer-checkout.component';


@NgModule({
  declarations: [
    CustomerProductsComponent,
    CustomerShoppingCartComponent,
    CustomerDashboardComponent,
    CustomerNavbarComponent,
    CustomerPurchaseHistoryComponent,
    CustomerCheckoutComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
