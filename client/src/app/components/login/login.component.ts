import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.user).subscribe(
      response => {
        this.authService.setToken(response.access_token);
        console.log("Giriş Başarılı", response)
      },
      error => {
        console.error("Hata: ", error)
      }
    )
  }

}
