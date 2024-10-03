import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable(); 

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
  setToken(token: string): void {
    this.cookieService.set('token', token);
    this.loggedIn.next(true);
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');
    return token ? true : false; 
  }

  logout(): void {
    this.cookieService.delete('token');
    this.loggedIn.next(false);
  }
}
