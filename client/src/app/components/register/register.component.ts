import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AlertifyService } from '../../services/alertify/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  user = {
    name:'',
    email: '',
    password: ''
  };

 constructor(private authService: AuthService,private alertifyService: AlertifyService,private router:Router){}


 ngOnInit(): void {
     console.log("sa")
 }

 register(): void{
  this.authService.register(this.user).subscribe(
    response => {
      this.authService.setToken(response.access_token);

      this.authService.setUserProfile(response);

      
      this.alertifyService.success("Logged In Successfully")
      this.router.navigate(['/questions']);
      this.ngOnInit()
    },
    error => {
      console.error("Hata: ", error)
      this.alertifyService.error("Register Failed");
    }
  )
 }



 



}
