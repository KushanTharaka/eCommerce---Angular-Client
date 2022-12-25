import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoriesControlComponent } from './adminComponents/admin-categories-control/admin-categories-control.component';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { AdminProductsControlComponent } from './adminComponents/admin-products-control/admin-products-control.component';
import { AdminShowCustomersComponent } from './adminComponents/admin-show-customers/admin-show-customers.component';

const routes: Routes = [
  {path: '', component: AdminDashboardComponent, children: [
    {path: 'adminProducts', component: AdminProductsControlComponent},
    {path: 'adminCategories', component: AdminCategoriesControlComponent},
    {path: 'adminShowCustomers', component: AdminShowCustomersComponent},
    {path: '', redirectTo: '/admin/adminProducts', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
