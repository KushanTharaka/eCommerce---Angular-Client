import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private auth: LoginAuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.auth.isAdminLoggedIn())
      {
        this.router.navigate(['login']);
        return false;
      }
      return this.auth.isAdminLoggedIn();
  }
  
}
