import { LogoutService } from './../../services/logout/logout.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { GetRequestService } from './../../services/httpGet/get-request.service';
import { QuestionResponse, Question } from '../../models/question';
import { AuthService } from '../../services/auth/auth.service';
import { switchMap } from 'rxjs';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(
    private getRequestService: GetRequestService,
    private authService: AuthService,
    private logoutService: LogoutService
  ) {}
  active: boolean = false;
  questionList: Question[];
  totalPageNumberArray: number[] = [];
  totalQuestions: number;
  limit: number = 5;
  totalPageNumber: number;
  page: number;
  sort: string = 'newest';
  filterText = '';
  isLoggedIn: boolean = false;
  userId: string;
  questionId: string;

  @ViewChild(NavComponent) navComponent: NavComponent;

  ngOnInit(): void {
    this.initializeData();

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
          this.userId = userData.data._id;
          // console.log(this.userId)
        }
      });

    this.logoutService.logoutEvent.subscribe(() => {
      this.onLogout(); // Olay tetiklendiğinde onLogout çağrılır
    });
  }

  initializeData() {
    this.getRequestService
      .getQuestions(this.page, this.limit, this.sort, this.filterText)
      .subscribe((data: QuestionResponse) => {
        this.totalQuestions = data.total;
        this.totalPageNumber = Math.ceil(this.totalQuestions / this.limit);
        this.questionList = data.data;
        this.totalPageNumberArray = Array(this.totalPageNumber)
          .fill(0)
          .map((x, i) => i + 1);
      });
  }

  onLogout() {
    this.userId= ""
    this.initializeData() 
    this.ngOnInit()
  }


  triggerFunction() {
    this.initializeData();
  }

  changePageNumber(value: number) {
    this.page = value;
    this.triggerFunction();
  }

  likeOrUndoLikeQuestion(questionID: string, liked: boolean) {
    this.getRequestService
      .likeAQuestion(questionID, liked)
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  changeSort(sortBy: string) {
    this.sort = sortBy;
    this.triggerFunction();
  }
}
