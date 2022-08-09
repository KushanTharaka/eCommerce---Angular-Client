import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { LoginDetails_Model } from 'src/app/services/models/login.model';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm !: FormGroup;
  public loginObj  = new LoginDetails_Model();

  constructor(private auth: LoginAuthService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    if(this.auth.isAdminLoggedIn())
    {
      this.router.navigate(['admin']);
    }
    if(this.auth.isCustomerLoggedIn())
    {
      this.router.navigate(['customer']);
    }

    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required,Validators.email])],
      password: [null, Validators.required],
  });

  }

  onSubmit(): void {

    this.loginObj.Email = this.loginForm.value.email;
    this.loginObj.Password = this.loginForm.value.password;
    //console.log(this.loginObj);
    this.auth.login(this.loginObj).subscribe(
      {         
        next: data => {
          //console.log(data.response);
          this.auth.setTemporyToken(data.response);
          const token = this.jwtHelper.decodeToken(localStorage.getItem('temporyToken')!);
          const token1 = localStorage.getItem('temporyToken')!;
          console.log(token.Role);
          if (token.Role === 'Admin')
          {
            this.auth.setAdminToken(token1);
            this.auth.removeTemporyToken();
            this.router.navigate(['/admin']);
          }
          if (token.Role === 'Customer')
          {
            this.auth.setCustomerToken(token1);
            this.auth.removeTemporyToken();
            this.router.navigate(['/customer']);
          }
        },
        error(err) {
          if(err.status === 404)
          {
            alert("Username or Password is incorrect");
          }
          else 
          {
            alert(err.message);
            console.log(err.status);
          }         
        },
      }
    );

  }

}
