import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { LoginDetails_Model } from 'src/app/services/models/login.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // loginForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });

  uRole: any;

  public loginForm !: FormGroup;
  public loginObj  = new LoginDetails_Model();

  constructor(private auth: LoginAuthService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

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
      email: ["", Validators.compose([Validators.required,Validators.email])],
      password: ["", Validators.required],
  });

  }

  onSubmit(): void {
    // if (this.loginForm.valid) {
    //   this.auth.login(this.loginForm.value).subscribe(
    //     {         
    //       next: data => {
    //         this.uRole = data.Role;
    //         console.log(data.Role)
    //         if (this.uRole === 'admin')
    //         {
    //           this.router.navigate(['/admin']);
    //         }
    //         else
    //         {
    //           this.router.navigate(['/customer']);
    //         }
    //       },
    //       error(err) {
    //         alert(err.message);
    //       },
    //     }
    //   );
    // }

    this.loginObj.Email = this.loginForm.value.email;
    this.loginObj.Password = this.loginForm.value.password;
    console.log(this.loginObj);
    this.auth.login(this.loginObj).subscribe(
      {         
        next: data => {
          //this.uRole = data.Role;
          console.log(data.response);
          // if (this.uRole === 'admin')
          // {
          //   this.router.navigate(['/admin']);
          // }
          // else
          // {
          //   this.router.navigate(['/customer']);
          // }
        },
        error(err) {
          alert(err.message);
          console.log(err.status);
        },
      }
    );

  }

}
