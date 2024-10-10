import { PutRequestService } from './../../services/httpPut/put-request.service';
import { DeleteRequestService } from './../../services/httpDelete/delete-request.service';
import { PostRequestService } from './../../services/httpPost/post-request.service';
import { AuthService } from './../../services/auth/auth.service';
import { GetRequestService } from './../../services/httpGet/get-request.service';
import { AlertifyService } from './../../services/alertify/alertify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../../models/answer';
import { timeAgo } from '../../utilities/date';
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
  isEditing: { [key: string]: boolean } = {};
  originalAnswer: { content: string; _id: string }[] = [];
  active: boolean = false;

  constructor(
    private getRequestService: GetRequestService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private postRequestService: PostRequestService,
    private deleteRequestService: DeleteRequestService,
    private putRequestService:PutRequestService
  ) {}

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
            this.userId = profileData.data.id;
            return this.getRequestService.getUserById(profileData.data.id);
          }
          return [];
        })
      )

      .subscribe((data) => {
        this.isLoggedIn = data;
      });
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
    return timeAgo(dateString);
  }

  answerAQuestion() {
    this.postRequestService
      .answerQuestion(this.questionId, this.answerObject)
      .subscribe((data) => {
        this.ngOnInit();
        this.answerObject = {
          content: '',
        };
      });
  }

  deleteOwnAnswer(answerId: string) {
    this.deleteRequestService
      .deleteAnswer(this.questionId, answerId)
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  toggleEditMode(answerId:string){
    const answer = this.answers.find((q) => q._id === answerId);
    if (answer) {
      if (answer.content && answer._id) {
        const original = {
          content: answer.content,
          _id: answer._id,
        };
        const index = this.originalAnswer.findIndex(
          (q) => q._id === answerId
        );

        if (index === -1) {
          this.originalAnswer.push(original);
        }

        this.isEditing[answerId] = true;
      } else {
        console.error('Question properties are undefined:', answer);
      }
    }
  }

  saveAnswer(answerId:string){
    const answer = this.answers.find((q) => q._id === answerId);
    if (answer) {
      this.isEditing[answerId] = false;
      this.putRequestService
        .editAnswer(this.questionId,answerId, {
          content: answer.content,
        })
        .subscribe(() => {
          this.isEditing[answerId] = false;
          this.ngOnInit();
        });
    }
  }

  cancelEdit(answerId:string){
    const originalQuestion = this.originalAnswer.find(
      (q) => q._id === answerId
    );
    if (originalQuestion) {
      this.answers = this.answers.map((q) =>
        q._id === answerId
          ? {
              ...q,
              content: originalQuestion.content,
            }
          : q
      );
      this.originalAnswer = this.originalAnswer.filter(
        (q) => q._id !== answerId
      );
    }
    this.isEditing[answerId] = false;
  }

  likeOrUndoLikeAnswer(answerId:string ,liked: boolean) {
    this.getRequestService
      .likeAnswer(this.questionId,answerId, liked)
      .subscribe((data) => {
        this.ngOnInit();
      });
  }


}
