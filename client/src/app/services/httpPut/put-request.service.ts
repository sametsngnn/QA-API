import { Question } from './../../models/question';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Answer } from '../../models/answer';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class PutRequestService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  path = 'http://localhost:5000/api/';

  editQuestion(questionId:string, question:Question):Observable<any>{
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}`
    },);

    return this.http.put(this.path+"questions/"+questionId+"/edit",question,{headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  editAnswer(questionId:string,answerId:string,answer:Answer):Observable<any>{
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}`
    },);
    return this.http.put(this.path + `questions/${questionId}/answers/${answerId}/edit`,answer, {headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  editProfile(userInf:{}){
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}`
    },);

    return this.http.put(this.path + `/auth/edit` ,userInf ,{ headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'There is a error: ' + err.error.message;
    } else {
      errorMessage = 'Systemic error';
    }
    return throwError(errorMessage);
  }

  
}
