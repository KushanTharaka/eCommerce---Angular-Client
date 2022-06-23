import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { AdminProductsControlComponent } from './adminComponents/admin-products-control/admin-products-control.component';
import { AdminNavbarComponent } from './adminComponents/admin-navbar/admin-navbar.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminProductsControlComponent,
    AdminNavbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
