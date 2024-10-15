import { AdminService } from './../../services/admin/admin.service';
import { Component } from '@angular/core';
import { GetRequestService } from '../../services/httpGet/get-request.service';
import { User, UserResponse } from '../../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private getRequestService: GetRequestService,private adminService:AdminService) {}

  page: number;
  limit: number = 5;
  searchBy: string;
  userList: User[] = [];
  totalPageNumber: number;
  totalPageNumberArray: number[] = [];
  totalUser: number;

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.getRequestService
      .getUsers(this.page, this.limit, this.searchBy)
      .subscribe((data: UserResponse) => {
        this.totalUser = data.total;
        this.userList = data.data;
        this.totalPageNumber = Math.ceil(this.totalUser / this.limit);
        this.totalPageNumberArray = Array(this.totalPageNumber)
          .fill(0)
          .map((x, i) => i + 1);
      });
  }

  triggerFunction() {
    this.initializeData();
  }

  changePageNumber(value: number) {
    this.page = value;
    this.triggerFunction();
  }

  deleteAccount(userId:string){
    this.adminService.deleteUser(userId).subscribe(data => {
      this.ngOnInit()
    }
    )
  }

  blockAccount(userId:string) {
    this.adminService.blockUser(userId).subscribe(data => {
      this.ngOnInit()
    }
    )
  }
  
}
