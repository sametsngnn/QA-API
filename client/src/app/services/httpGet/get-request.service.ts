import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { QuestionResponse } from '../../models/question';

@Injectable()
export class GetRequestService {
  constructor(private http: HttpClient) { }
  path = 'http://localhost:5000/api/questions';

  getQuestions(): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(this.path).pipe(
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'There is a error: ' + err.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata';
    }
    return throwError(errorMessage);
  }
}
