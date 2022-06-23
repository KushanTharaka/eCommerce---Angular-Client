import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customerComponents/customer-dashboard/customer-dashboard.component';
import { CustomerProductsComponent } from './customerComponents/customer-products/customer-products.component';
import { CustomerShoppingCartComponent } from './customerComponents/customer-shopping-cart/customer-shopping-cart.component';

const routes: Routes = [
  {path: '', component: CustomerDashboardComponent, children: [
    {path: 'customerProducts', component: CustomerProductsComponent},
    {path: 'customerShoppingCart', component: CustomerShoppingCartComponent},
    {path: '', redirectTo: '/customer/customerProducts', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
