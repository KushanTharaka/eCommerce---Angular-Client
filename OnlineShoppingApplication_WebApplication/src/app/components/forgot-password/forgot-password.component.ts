import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginDetails_Model } from 'src/app/services/models/login.model';
import { RegisterAuthService } from 'src/app/services/register-auth.service';
import Swal from 'sweetalert2'

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
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

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

    this.loginObj.Email = email;
    this.loginObj.Password = "PW_not_Needed";
    this.regAuth.checkAccountAvailability(this.loginObj).subscribe({
      next: (data: any) => {
        this.Id = data.response;
        this.regAuth.sendOtpCode(this.randomNum, this.loginObj).subscribe({
          next: (data: any) => {
            this.toastr.success('OTP sent to the Email Succesfully', 'OTP');
          },
          error: (err: { status: number; message: any; }) => {
            this.toastr.error('Try Again', 'OTP');
          }
        });
      },
      error(err: { status: number; message: any; }) {
        if(err.status === 404)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'User Does not Exist!',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else 
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          });
          console.log(err.message);
        }
      }
    });
    
  }

  onSubmit(): void{
    if((this.changePasswordForm.value.otp == this.randomNum) && this.changePasswordForm.value.otp > 1){

      this.regAuth.updatePassword(this.Id, this.changePasswordForm.value.conPwd).subscribe(
        {         
          next: data => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Password updated successfully',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/login']);      
          },
          error(err) {
            if(err.status === 404)
            {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Already exists!',
                showConfirmButton: false,
                timer: 1500
              });
            }
            else if(err.status === 400)
            {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Bad Request',
                showConfirmButton: false,
                timer: 1500
              });
              console.log(err.message);
            } 
            else 
            {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
              });
              console.log(err.message);
            }         
          },
        }
      );

    }
    else{     
      console.log("OTP is incorrect!");
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'OTP is incorrect!',
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  }

}
