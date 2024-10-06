import { PutRequestService } from './../../services/httpPut/put-request.service';
import { DeleteRequestService } from './../../services/httpDelete/delete-request.service';
import { PostRequestService } from './../../services/httpPost/post-request.service';
import { LogoutService } from './../../services/logout/logout.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GetRequestService } from './../../services/httpGet/get-request.service';
import { QuestionResponse, Question } from '../../models/question';
import { AuthService } from '../../services/auth/auth.service';
import { switchMap } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
import { timeAgo } from '../../utilities/date';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(
    private getRequestService: GetRequestService,
    private authService: AuthService,
    private logoutService: LogoutService,
    private postRequestService: PostRequestService,
    private deleteRequestService: DeleteRequestService,
    private putRequestService:PutRequestService
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
  questionObject = {
    title: '',
    content: '',
  };
  editedQuestion = {
    title: '',
    content: '',
  };
  isEditing: { [key: string]: boolean } = {};
  originalQuestions: { title: string; content: string; _id: string }[] = [];


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
        }
      });

    this.logoutService.logoutEvent.subscribe(() => {
      this.onLogout();
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
    this.userId = '';
    this.initializeData();
    this.ngOnInit();
  }

  triggerFunction() {
    this.initializeData();
  }

  changePageNumber(value: number) {
    this.page = value;
    this.triggerFunction();
  }

  askAQuestion() {
    this.postRequestService
      .askQuestion(this.questionObject)
      .subscribe((data) => {
        this.ngOnInit();
        this.questionObject = {
          title: '',
          content: '',
        };
      });
  }

  editAQuestion(questionId:string){
    this.putRequestService.editQuestion(questionId,this.editedQuestion).subscribe(data => {
      
    })
  }

  deleteOwnQuestion(questionId: string) {
    this.deleteRequestService.deleteQuestion(questionId).subscribe((data) => {
      this.ngOnInit();
    });
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

  timeAgo(dateString: any): any {
    return timeAgo(dateString);
  }

  toggleEditMode(questionId: string) {
    const question = this.questionList.find(q => q._id === questionId);
    if (question) {
      if (question.title && question.content && question._id) {
        const original = { title: question.title, content: question.content, _id: question._id };
        const index = this.originalQuestions.findIndex(q => q._id === questionId);
  
        if (index === -1) {
          this.originalQuestions.push(original);
        }
  
        this.isEditing[questionId] = true;
      } else {
        console.error("Question properties are undefined:", question);
      }
    }
  }
  
  

  saveQuestion(questionId: string) {
    const question = this.questionList.find((q) => q._id === questionId);
    if (question) {
      this.isEditing[questionId] = false;
      this.putRequestService
        .editQuestion(questionId, { title: question.title, content: question.content })
        .subscribe(() => {
          this.isEditing[questionId] = false;
          this.ngOnInit();
        });
    }
  }

  cancelEdit(questionId: string) {
    const originalQuestion = this.originalQuestions.find(q => q._id === questionId);
    if (originalQuestion) {
      this.questionList = this.questionList.map(q => 
        q._id === questionId 
          ? { 
              ...q,
              title: originalQuestion.title, 
              content: originalQuestion.content 
            } 
          : q
      );
      this.originalQuestions = this.originalQuestions.filter(q => q._id !== questionId); 
    }
    this.isEditing[questionId] = false; 
  }
  
  
  
}
