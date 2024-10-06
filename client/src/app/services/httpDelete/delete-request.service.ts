import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeleteRequestService {

  constructor(private http: HttpClient,private authService: AuthService) { }
  path = 'http://localhost:5000/api/';

  deleteQuestion(questionId:string):Observable<any>{
    const token = this.authService.getToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}`
    });

    return this.http.delete(this.path+"questions/"+questionId+"/delete", { headers })
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
