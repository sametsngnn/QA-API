import { PostRequestService } from './../../../services/httpPost/post-request.service';
import { PutRequestService } from './../../../services/httpPut/put-request.service';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { GetRequestService } from '../../../services/httpGet/get-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  isLoggedIn: boolean = false;
  userName: string;
  userProfileImage: string;
  userEmail: string;
  selectedFile: File;  

  editedProfile = {
    editedUserName: '',
    editedUserEmail: ''
  };

  constructor(private authService: AuthService, private getRequestService: GetRequestService, private putRequestService:PutRequestService,private postRequestService:PostRequestService) {}

  ngOnInit(): void {
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
          this.userEmail = userData.data.email;
        }
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadProfileImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profile_image', this.selectedFile);
      
      console.log(formData)
      this.postRequestService.uploadProfile(formData).subscribe(data => {
        this.ngOnInit()
      })
    } 
  }

  editProfile(): void {
    const updatedUserName = this.editedProfile.editedUserName || this.userName;
    const updatedUserEmail = this.editedProfile.editedUserEmail || this.userEmail;

    const body = {
      name: updatedUserName,
      email: updatedUserEmail
    };

    this.putRequestService.editProfile(body).subscribe(data => {
      this.ngOnInit()
    })
  }
}
