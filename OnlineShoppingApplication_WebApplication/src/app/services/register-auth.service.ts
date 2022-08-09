import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterAuthService {

  public ApiUrl: string = "https://localhost:44373/";
  constructor(private router: Router, private http: HttpClient) { }

  registerCustomer(registerObj: any)
  {
    return this.http.post<any>("https://localhost:44373/registerCustomer", registerObj);
  }

}
