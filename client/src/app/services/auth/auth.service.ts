import { AlertifyService } from './../alertify/alertify.service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { error } from 'console';
// import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private cookieService: CookieService,private alertifyService:AlertifyService) {
    const token = this.cookieService.get('token');
    if (token) {
      this.loggedIn.next(true);  // Eğer token varsa oturum açılmış demektir
    }
  }

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable(); 

  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();


  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
  register(user: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, user)
  }
  setToken(token: string): void {
    this.cookieService.set('token', token);
    this.loggedIn.next(true);
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  getProfile(): Observable<any> {
    const token = this.getToken(); // Token'ı al
    const headers = new HttpHeaders({
      'Authorization': `Bearer: ${token}` // Header'a token'ı ekle
    },);
    return this.http.get(`${this.apiUrl}/profile`, { headers })
    .pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)) // Hataları yakala
    ); // Header'ı isteğe ekle
  }

  getProfileWhoLoggedIn(){

  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');
    return token ? true : false; 
  }

  logout(): void {
    this.cookieService.delete('token');
    this.loggedIn.next(false);
    this.userProfileSubject.next(null)
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.status)
    if (error.status === 401) {
      // 401 Unauthorized hatasını yakala
      console.error('Unauthorized access - possibly invalid token');
      this.logout();
      this.alertifyService.error("Unauthorized access - possibly invalid token")

    } else {
      console.error('An unexpected error occurred:', error.message);
    }

    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }


  setUserProfile(userProfile: any): void {
    this.userProfileSubject.next(userProfile);
  }
}
