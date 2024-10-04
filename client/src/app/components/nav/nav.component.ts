import { GetRequestService } from './../../services/httpGet/get-request.service';
import { AlertifyService } from './../../services/alertify/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {  Subject, switchMap } from 'rxjs';
import { createPopper } from '@popperjs/core';
import { LogoutService } from '../../services/logout/logout.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  logoutEvent: Subject<void> = new Subject<void>();

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userName: string;
  userProfileImage: string;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private getRequestService: GetRequestService,
    private logoutService: LogoutService
  ) {}

  ngOnInit(): void {
    // Login durumunu gözlemle
    this.authService.loggedIn$
      .pipe(
        switchMap((isLoggedIn) => {
          this.isLoggedIn = isLoggedIn;
          if (this.isLoggedIn) {
            return this.authService.getProfile();
          } else {
            return [];
          }
        }),
        switchMap((profileData: any) => {
          if (profileData && profileData.data.id) {
            return this.getRequestService.getUserById(profileData.data.id);
          }
          return [];
        })
      )
      .subscribe((userData: any) => {
        if (userData && userData.data) {
          this.userName = userData.data.name;
          this.userProfileImage = userData.data.profile_image;
          this.isAdmin = userData.data.role === 'admin';
        }
      });
  }

  logout() {
    this.authService.logout();
    this.alertifyService.error('Logged Out Successfully');
    this.isLoggedIn = false;
    this.logoutService.emitLogout();
  }
}
