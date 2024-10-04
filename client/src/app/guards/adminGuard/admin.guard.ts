import { GetRequestService } from './../../services/httpGet/get-request.service';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private getRequestService: GetRequestService) {}

  canActivate(): Observable<boolean> {
    return this.authService.getProfile().pipe(
      switchMap(profile => { 
        return this.getRequestService.getUserById(profile.data.id).pipe(
          map(data => {
            const userRole = data.data.role;
            if (userRole === 'admin') {
              return true;
            } else {
              this.router.navigate(['/']);
              return false;
            }
          }),
          catchError(error => {
            console.error('Error fetching user role', error);
            this.router.navigate(['/']);
            return of(false);
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching profile', error);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
