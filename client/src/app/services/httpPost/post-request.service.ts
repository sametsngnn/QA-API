import { AlertifyService } from './../alertify/alertify.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Question } from '../../models/question';
import { catchError, Observable, throwError } from 'rxjs';
import { Answer } from '../../models/answer';

@Injectable({
  providedIn: 'root'
})
export class PostRequestService {

  constructor(private authService:AuthService, private http:HttpClient, private alertifyService:AlertifyService) { }

  path = 'http://localhost:5000/api/';

  askQuestion(question:Question):Observable<Question>{
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}`
    },);
    return this.http.post(this.path+"questions/ask",question,{ headers })
    .pipe(
      
      catchError(err => {
        this.handleError(err);
        return throwError(err); 
      })
    );
  }

  answerQuestion(questionId:string,answer:Answer):Observable<Question>{
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}`
    },);
    return this.http.post(this.path+"questions/"+ questionId+ "/answers",answer,{ headers })
    .pipe(
      
      catchError(err => {
        this.handleError(err);
        return throwError(err); 
      })
    );
  }


  handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.status === 400) {
      this.alertifyService.error("Title or content is invalid (Min 10 characters)");
    } else if (err.status === 401) {
      this.alertifyService.error("Unauthorized access. Please log in again.");
    } else {

      this.alertifyService.error("An error occurred while processing your request.");
    }

    if (err.error instanceof ErrorEvent) {
      errorMessage = 'There is an error: ' + err.error.message;
    } else {
      errorMessage = 'Systemic error';
    }

    return throwError(errorMessage);
  }
  
}
