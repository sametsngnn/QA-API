import { AuthService } from './../../services/auth/auth.service';
import { Question } from './../../models/question';
import { GetRequestService } from './../../services/httpGet/get-request.service';
import { AlertifyService } from './../../services/alertify/alertify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from '../../models/answer';
import { Observable } from 'rxjs';

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

  constructor(
    private getRequestService: GetRequestService,
    private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(data => {
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
        .getAnswerDetails(questionId, answer._id)
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval}y`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval}m`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval}d`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval}h`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval}m`;

    return 'now';
  }
}
