import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.scss']
})
export class CustomerNavbarComponent implements OnInit {

  constructor(private auth: LoginAuthService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.auth.customerLogout();
  }

}
