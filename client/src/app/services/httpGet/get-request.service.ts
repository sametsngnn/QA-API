import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { QuestionResponse } from '../../models/question';
import { UserResponse } from '../../models/user';
import { UsersComponent } from '../../components/users/users.component';

@Injectable({
  providedIn:'root'
}
)
export class GetRequestService {
  constructor(private http: HttpClient,private authService: AuthService) { }
  path = 'http://localhost:5000/api/';

  

  getQuestions(page:number=1,limit:number=5,sort:string="newest",searchTerm:string=""): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(this.path + `questions?page=${page}&limit=${limit}&sortBy=${sort}&search=${searchTerm}`).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(page:number=1,limit:number=5,searchTerm:string=""):Observable<UserResponse>{
    return this.http.get<UserResponse>(this.path + `users?page=${page}&limit=${limit}&search=${searchTerm}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id:number):Observable<any>{
    return this.http.get(this.path + "users/"+ id).pipe(
      catchError(this.handleError)
    );
  }

  likeAQuestion(id:string,active:boolean):Observable<any>{
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}` // Header'a token'ı ekle
    },);
    if(active){
      return this.http.get(this.path + "questions/"+ id + "/undo_like", { headers }).pipe(
        catchError(this.handleError)
      );
    } else {
      // Like
      return this.http.get(this.path + "questions/"+ id + "/like", { headers }).pipe(
      catchError(this.handleError)
    );
    }
    
  }

  getAnswers(questionId: string):Observable<any>{
    return this.http.get(this.path + "questions/" + questionId + "/answers").pipe(
      catchError(this.handleError)
    );
  }
  getAnswerDetails(questionId: string,answerId: string): Observable<any> {
    return this.http.get(`${this.path}questions/${questionId}/answers/${answerId}`).pipe(
      catchError(this.handleError)
    );
  }

  getSingleQuestion(questionId:string):Observable<any>{
    return this.http.get(this.path+"questions/"+ questionId).pipe(
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
