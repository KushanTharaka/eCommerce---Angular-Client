import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  public ApiUrl: string = "https://localhost:44373/";
  constructor(private router: Router, private http: HttpClient) { }

  setTemporyToken(token: string): void {
    localStorage.setItem('temporyToken', token);
  }

  setAdminToken(token: string): void {
    localStorage.setItem('adminToken', token);
  }

  setCustomerToken(token: string): void {
    localStorage.setItem('customerToken', token);
  }

  getAdminToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  getCustomerToken(): string | null {
    return localStorage.getItem('customerToken');
  }

  isAdminLoggedIn() {
    return this.getAdminToken() !== null;
  }

  isCustomerLoggedIn() {
    return this.getCustomerToken() !== null;
  }

  removeTemporyToken() {
    localStorage.removeItem('temporyToken');
  }

  adminLogout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['login']);
  }

  customerLogout() {
    localStorage.removeItem('customerToken');
    this.router.navigate(['login']);
  }

  login(loginObj: any)
  {
    return this.http.post<any>("https://localhost:44373/Login", loginObj);
  }

}
