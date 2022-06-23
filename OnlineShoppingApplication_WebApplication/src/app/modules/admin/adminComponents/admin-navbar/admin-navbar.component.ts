import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private auth: LoginAuthService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.auth.adminLogout();
  }

}
