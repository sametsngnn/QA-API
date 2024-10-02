import { Component, OnInit } from '@angular/core';
import { GetRequestService } from './../../services/httpGet/get-request.service';
import { QuestionResponse, Question } from '../../models/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  constructor(private getRequestService: GetRequestService) {}

  questionList: Question[];
  totalPageNumberArray: number[] = [];
  totalQuestions: number;
  limit: number = 5;
  totalPageNumber: number;
  page:number;
  sort:string = "newest"
  filterText = ''


  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.getRequestService
      .getQuestions(this.page,this.limit,this.sort,this.filterText)
      .subscribe((data: QuestionResponse) => {
        this.totalQuestions = data.total;
        this.totalPageNumber = Math.ceil(this.totalQuestions / this.limit);
        this.questionList = data.data;
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
    this.triggerFunction() 
  }

  changeSort(sortBy:string){
    this.sort=sortBy
    this.triggerFunction()
  }
}
