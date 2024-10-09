import { DeleteRequestService } from './../../services/httpDelete/delete-request.service';
import { PostRequestService } from './../../services/httpPost/post-request.service';
import { AuthService } from './../../services/auth/auth.service';
import { Question } from './../../models/question';
import { GetRequestService } from './../../services/httpGet/get-request.service';
import { AlertifyService } from './../../services/alertify/alertify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../../models/answer';
import { timeAgo } from '../../utilities/date';
import { time } from 'console';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.css',
})
export class AnswersComponent implements OnInit {
  

  
  answers: Answer[];
  questionId: string;
  questionOwner: string;
  questionTitle: string;
  questionContent: string;
  answerId: number;
  userOwnerAnswer: string;
  loadingUserDetails: boolean = true;
  isLoggedIn: boolean = false;
  userId: string;
  answerObject = {
    content: '',
  };

  constructor(
    private getRequestService: GetRequestService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private postRequestService:PostRequestService,
    private deleteRequestService:DeleteRequestService
  ) { }

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
          this.userId = profileData.data.id
          return this.getRequestService.getUserById(profileData.data.id);
        }
        return [];
      })


    )
    
    .subscribe(data => {
      this.isLoggedIn = data
    })
    this.activatedRoute.params.subscribe((params) => {
      this.getRequestService
        .getSingleQuestion(params['questionId'])
        .subscribe((data) => {
          this.questionOwner = data.data[0].user.name;
          this.questionTitle = data.data[0].title;
          this.questionContent = data.data[0].content;   
        });
      this.getRequestService
        .getAnswers(params['questionId'])
        .subscribe((data) => {
          this.answers = data.data;
          this.questionId = params['questionId'];
          this.loadUserDetails(this.questionId);
        });
    });
  }

  async loadUserDetails(questionId: string) {
    const userRequests = this.answers.map((answer) =>
      this.getRequestService
        .getAnswerDetails(questionId, answer?._id || '')
        .toPromise()
    );
    try {
      const users = await Promise.all(userRequests);
      this.answers.forEach((answer, index) => {
        answer.user = users[index].data.user;
      });
    } catch (error) {
      console.error('Error loading user details', error);
    } finally {
      this.loadingUserDetails = false;
    }
  }

  timeAgo(dateString: string): string {
    return timeAgo(dateString)
  }

  answerAQuestion(){
    this.postRequestService.answerQuestion(this.questionId,this.answerObject).subscribe(data => {
      this.ngOnInit()
      this.answerObject = {
        content: ''
      }
    })
  }

  deleteOwnAnswer(answerId:string){
    this.deleteRequestService.deleteAnswer(this.questionId,answerId).subscribe(data => {
      this.ngOnInit()
    })
  }


}
