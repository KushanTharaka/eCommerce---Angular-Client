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

  adminLogout() {
    localStorage.removeItem('adminToken');
    this.router.navigate(['login']);
  }

  customerLogout() {
    localStorage.removeItem('customerToken');
    this.router.navigate(['login']);
  }

  // login({ email, password }: any): Observable<any> {
  //   if (email === 'admin@gmail.com' && password === 'admin1234') {
  //     this.setAdminToken('admin');
  //     return of({ name: 'Kushan Tharaka', email: 'admin@gmail.com', Role: 'admin' });
  //   }
  //   if (email === 'customer@gmail.com' && password === 'customer1234') {
  //     this.setCustomerToken('customer');
  //     return of({ name: 'Eranga Janaka', email: 'eranga@gmail.com', Role: 'customer' });
  //   }
  //   return throwError(() => new Error('Failed to log in'));
  // }

  login(loginObj: any)
  {
    //return this.http.post<any>(`$(this.ApiUrl)/Login`, loginObj);

    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    //return this.http.post<any>("https://localhost:44373/Login", loginObj, {headers: headers});
    
    // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // return this.http.post<any>("https://localhost:44373/Login", loginObj, { headers });

    return this.http.post<any>("https://localhost:44373/Login", loginObj);
  }

}
