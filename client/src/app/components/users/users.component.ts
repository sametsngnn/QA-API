import { Component, OnInit } from '@angular/core';
import { GetRequestService } from '../../services/httpGet/get-request.service';
import { User, UserResponse } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {
  constructor(private getRequestService: GetRequestService){

  }

  userList: User[] = []


  ngOnInit(): void {
      this.getRequestService.getUsers().subscribe((data: UserResponse) => {
      this.userList = data.data;
    });
  }
}
