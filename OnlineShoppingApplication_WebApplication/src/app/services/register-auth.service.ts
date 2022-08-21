import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterAuthService {

  public baseURL: string = "https://localhost:44373/";
  constructor(private router: Router, private http: HttpClient) { }

  registerCustomer(registerObj: any)
  {
    return this.http.post<any>("https://localhost:44373/registerCustomer", registerObj);
  }

  checkAccountAvailability(loginObj: any): any
  {
    //only the email is used in the obj
    return this.http.post<any>(`${this.baseURL}`+"pwdChangeAccCheck", loginObj);
  }

  sendOtpCode(otp: any)
  {
    return this.http.post<any>(`${this.baseURL}`+"sendOTP/" + otp, otp);
  }

  updatePassword(Id: string, password: string)
  {
    return this.http.put<any>(`${this.baseURL}`+"updatePassword/" + Id + "/" + password, Id);
  }

}
