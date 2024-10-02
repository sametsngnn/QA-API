import { Component, OnInit } from '@angular/core';
import { GetRequestService } from '../../services/httpGet/get-request.service';
import { User, UserResponse } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private getRequestService: GetRequestService) {}

  page:number
  limit: number = 5;
  searchBy:string
  userList: User[] = [];
  totalPageNumber: number;
  totalPageNumberArray: number[] = [];
  totalUser: number;

  ngOnInit(): void {
    this.initializeData()
  }


  initializeData() {
    this.getRequestService.getUsers(this.page,this.limit,this.searchBy).subscribe((data: UserResponse) => {
      this.totalUser = data.total
      this.userList = data.data;
      this.totalPageNumber = Math.ceil(this.totalUser / this.limit);
      this.totalPageNumberArray = Array(this.totalPageNumber)
          .fill(0)
          .map((x, i) => i + 1);
    });
  }

  triggerFunction(){
    this.initializeData()
  }

  changePageNumber(value: number) {
    this.page = value;
    this.triggerFunction() 
  }


}
