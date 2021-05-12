import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, MonoTypeOperatorFunction, Observable, OperatorFunction} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {AuthResponse} from '../payload/auth-response.payload';
import {map, tap} from 'rxjs/operators';
import {LoginRequestPayload} from '../payload/login-request.payload';
import {UserRequestPayload} from '../payload/user-request.payload';
import {serverUrl} from '../server.url';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  signup(authRequestPayload: UserRequestPayload): Observable<any> {
    return this.httpClient.post<AuthResponse>(serverUrl + 'auth/signup', authRequestPayload)
      .pipe(this.mapUser());
  }

  updateUsernameAndRole(): MonoTypeOperatorFunction<User> {
    return tap(user => {
      this.localStorage.store('username', user.username);
      this.localStorage.store('role', user.role);
    });
  }

  private mapUser(): OperatorFunction<any, any>  {
    return map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('role', data.role);

      this.loggedIn.next(true);
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
    this.clearStorage();
    this.loggedIn.next(false);
  }

  getUsername(): string {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  setUsernameInStorage(username: string): void {
    this.localStorage.store('username', username);
  }

  clearStorage(): void {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('role');
  }
}
