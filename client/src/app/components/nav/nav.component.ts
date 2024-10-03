import { AlertifyService } from './../../services/alertify/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,private alertifyService:AlertifyService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(){
    this.authService.logout()
    this.alertifyService.error("Logged Out Successfully")
    this.ngOnInit()
  }
}
