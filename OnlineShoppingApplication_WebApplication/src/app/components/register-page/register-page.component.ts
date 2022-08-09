import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { CustomerRegisterDetails_Model } from 'src/app/services/models/customerRegister.model';
import { RegisterAuthService } from 'src/app/services/register-auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public registerForm !: FormGroup;
  public registerObj  = new CustomerRegisterDetails_Model();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: LoginAuthService,
    private regAuth: RegisterAuthService) { }

  ngOnInit(): void {

    if(this.auth.isAdminLoggedIn())
    {
      this.router.navigate(['admin']);
    }
    if(this.auth.isCustomerLoggedIn())
    {
      this.router.navigate(['customer']);
    }

    this.registerForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      title: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.required],
  });

  }

  onSubmit(): void{
    this.registerObj.Email = this.registerForm.value.email;
    this.registerObj.Password = this.registerForm.value.password;
    this.registerObj.Title = this.registerForm.value.title;
    this.registerObj.FirstName = this.registerForm.value.fName;
    this.registerObj.LastName = this.registerForm.value.lName;
    this.registerObj.Gender = this.registerForm.value.gender;
    this.registerObj.Address = this.registerForm.value.address;
    this.registerObj.ZipCode = this.registerForm.value.zipCode;
    //console.log(this.registerObj)

    this.regAuth.registerCustomer(this.registerObj).subscribe(
      {         
        next: data => {
          
          alert("Account created successfully");
          this.router.navigate(['/login']);

        },
        error(err) {
          if(err.status === 404)
          {
            alert("Email already exists");
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
