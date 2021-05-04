import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, OperatorFunction} from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthResponse } from '../login/auth-response.payload';
import { map } from 'rxjs/operators';
import {LoginRequestPayload} from './login-request.payload';
import {UserRequestPayload} from './user-request.payload';
import {serverUrl} from '../../shared/server.url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  signup(authRequestPayload: UserRequestPayload): Observable<any> {
    return this.httpClient.post<AuthResponse>(serverUrl + 'auth/signup', authRequestPayload)
      .pipe(this.mapUser());
  }

  private mapUser(): OperatorFunction<any, any>  {
    return map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('role', data.role);

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    });
  }

  login(authRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<AuthResponse>(serverUrl + 'auth/login', authRequestPayload)
      .pipe(this.mapUser());
  }

  getJwtToken(): string {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRole(): string {
    return this.localStorage.retrieve('role');
  }

  logout(): void {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('role');
  }

  getUserName(): string {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
