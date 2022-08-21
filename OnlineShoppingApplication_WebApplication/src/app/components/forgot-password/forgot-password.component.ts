import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetails_Model } from 'src/app/services/models/login.model';
import { RegisterAuthService } from 'src/app/services/register-auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public changePasswordForm !: FormGroup;
  public sendOtpForm !: FormGroup;

  public loginObj  = new LoginDetails_Model();

  constructor(private regAuth: RegisterAuthService,
    private router: Router, 
    private formBuilder: FormBuilder) { }

  randomNum: number = 1;
  minValue: number = 11111111;
  Id: string = '';

  ngOnInit(): void {

    this.randomNum = Math.random();

    this.changePasswordForm = this.formBuilder.group({
      otp: [, Validators.required],
      newPwd: ['', Validators.required],
      conPwd: ['', Validators.required]
  });

  this.sendOtpForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required,Validators.email])]
});

  }

  createRandomNum(email: string): void{
    var min = 11111111;
    var max = 99999999;
    min = Math.ceil(min);
	  max = Math.floor(max);
	  this.randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    //console.log(this.randomNum, email);

    this.loginObj.Email = email;
    this.loginObj.Password = "PW_not_Needed";
    console.log(this.loginObj);
    this.regAuth.checkAccountAvailability(this.loginObj).subscribe({
      next: (data: any) => {
        this.Id = data.response;
        this.regAuth.sendOtpCode(this.randomNum).subscribe();
        console.log(data);
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          alert("User Doesn't Exist!");
        }
        else 
        {
          alert(err.message);
          console.log(err.status);
        }
      }
    });
    
  }

  onSubmit(): void{
    if((this.changePasswordForm.value.otp == this.randomNum) && this.changePasswordForm.value.otp > 1){

      this.regAuth.updatePassword(this.Id, this.changePasswordForm.value.conPwd).subscribe(
        {         
          next: data => {
            alert("Password updated successfully");
            this.router.navigate(['/login']);      
          },
          error(err) {
            if(err.status === 404)
            {
              alert("Already exists");
            }
            else if(err.status === 400)
            {
              alert("Bad Request");
              console.log(err.status);
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
    else{     
      console.log("otp is incorrect!");
      alert("otp is incorrect!");
    }
    
  }

}
