import { Component, OnInit } from '@angular/core';
import { GetRequestService } from './../../services/httpGet/get-request.service';
import { QuestionResponse, Question } from '../../models/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [GetRequestService]
})
export class QuestionsComponent implements OnInit {
  constructor(private getRequestService: GetRequestService) {}

  questionList: Question[] = [];

  ngOnInit(): void {
    this.getRequestService.getQuestions().subscribe((data: QuestionResponse) => {
      this.questionList = data.data;
    });
  }
}
