import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, defaultUser} from '../model/user';
import {serverUrl} from '../server.url';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRequestPayload} from '../payload/user-request.payload';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User> = new BehaviorSubject(defaultUser);
  inOrganization: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.loadSelf();
    this.user.subscribe(u => authService.setUsernameInStorage(u.username));
    this.user.subscribe(u => this.inOrganization.next(u.organization !== undefined));
  }

  updateSelf(userRequestPayload: UserRequestPayload): Observable<User> {
    return this.httpClient.post<User>(serverUrl + 'users/update/self', userRequestPayload)
      .pipe(
        tap(data => {
          this.user.next(data);
        })
      );
  }

  loadSelf(): void {
    if (this.authService.isLoggedIn()) {
      this.httpClient.get<User>(serverUrl + 'users/self')
        .pipe(this.authService.updateUsernameAndRole())
        .subscribe(u => {
          this.user.next(u);
        });
    }
  }

  changeCompany(id: number | undefined): void {
    const u = this.user.getValue();
    const userRequestPayload: UserRequestPayload = {
      username:  u.username,
      password:  '',
      email:     u.email,
      firstName: u.firstName,
      lastName:  u.lastName,
      organizationId: id
    };
    this.httpClient.post<User>(serverUrl + 'users/update/self', userRequestPayload)
      .subscribe(res => this.user.next(res));
  }

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(serverUrl + 'users');
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(serverUrl + `users/${id}`);
  }

  findUser(id: number): Observable<User> {
    return this.httpClient.get<User>(serverUrl + `users/${id}`);
  }

  promoteUser(id: number): Observable<any> {
    return this.httpClient.post(serverUrl + `users/${id}/promote`, null);
  }
}
