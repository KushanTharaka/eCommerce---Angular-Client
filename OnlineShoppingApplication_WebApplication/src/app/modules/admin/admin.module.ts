import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { AdminProductsControlComponent } from './adminComponents/admin-products-control/admin-products-control.component';
import { AdminNavbarComponent } from './adminComponents/admin-navbar/admin-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCategoriesControlComponent } from './adminComponents/admin-categories-control/admin-categories-control.component';
import { AdminShowCustomersComponent } from './adminComponents/admin-show-customers/admin-show-customers.component';
import { AdminFooterComponent } from './adminComponents/admin-footer/admin-footer.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminProductsControlComponent,
    AdminNavbarComponent,
    AdminCategoriesControlComponent,
    AdminShowCustomersComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
