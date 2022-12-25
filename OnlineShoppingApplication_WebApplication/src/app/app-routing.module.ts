import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthAdminGuard } from './guards/adminGuard/auth-admin.guard';
import { AuthCustomerGuard } from './guards/customerGuard/auth-customer.guard';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'admin',
    canActivate: [AuthAdminGuard], 
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)},
  {path: 'customer', 
    canActivate: [AuthCustomerGuard],
    loadChildren: () => import('./modules/customer/customer.module').then((m) => m.CustomerModule)},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
