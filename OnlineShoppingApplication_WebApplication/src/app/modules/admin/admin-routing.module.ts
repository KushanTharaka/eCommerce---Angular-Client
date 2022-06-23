import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { AdminProductsControlComponent } from './adminComponents/admin-products-control/admin-products-control.component';

const routes: Routes = [
  {path: '', component: AdminDashboardComponent, children: [
    {path: 'adminProducts', component: AdminProductsControlComponent},
    {path: '', redirectTo: '/admin/adminProducts', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
