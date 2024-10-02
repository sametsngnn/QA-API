import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { QuestionResponse } from '../../models/question';
import { UserResponse } from '../../models/user';
import { UsersComponent } from '../../components/users/users.component';

@Injectable({
  providedIn:'root'
}
)
export class GetRequestService {
  constructor(private http: HttpClient) { }
  path = 'http://localhost:5000/api/';


  // /api/questions?page=${page}&limit=${limit}&sortBy=${sort}&search=${searchTerm}`

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
