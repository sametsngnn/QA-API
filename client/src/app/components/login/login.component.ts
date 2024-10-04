import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AlertifyService } from '../../services/alertify/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,private alertifyService: AlertifyService,private router:Router) {}

  ngOnInit(): void {
      
  }
  login(): void {
    this.authService.login(this.user).subscribe(
      response => {
        this.authService.setToken(response.access_token);

        this.authService.setUserProfile(response);

        
        this.alertifyService.success("Logged In Successfully")
        this.router.navigate(['/questions']);
        this.ngOnInit()
      },
      error => {
        console.error("Hata: ", error)
        this.alertifyService.error("Login Failed");
      }
    )
  }

}
