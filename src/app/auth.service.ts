import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  login() {
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
  }

  checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    this.isAuthenticatedSubject.next(!!token);
  }
}
