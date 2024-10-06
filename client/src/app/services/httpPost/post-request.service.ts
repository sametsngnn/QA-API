import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Question } from '../../models/question';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostRequestService {

  constructor(private authService:AuthService, private http:HttpClient) { }

  path = 'http://localhost:5000/api/';

  askQuestion(question:Question):Observable<Question>{
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}`
    },);
    return this.http.post(this.path+"questions/"+"ask",question,{ headers })
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
