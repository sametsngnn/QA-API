import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  logoutEvent = new Subject<void>(); // Logout olayı için bir Subject

  emitLogout() {
    this.logoutEvent.next(); // Logout olayını yayınla
  }
}