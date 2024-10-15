import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authService: AuthService) {}
  path = 'http://localhost:5000/api/admin/';

  
  deleteUser(userId:string):Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer: ${token}`,
    });

    return this.http.delete(this.path+`user/${userId}`,{headers})
    .pipe(catchError(this.handleError));

  }

  blockUser(userId:string):Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer: ${token}`,
    });

    return this.http.get(this.path+`block/${userId}`,{headers})
    .pipe(catchError(this.handleError));

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
