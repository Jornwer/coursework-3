import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, defaultUser} from '../model/user';
import {serverUrl} from '../server.url';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRequestPayload} from '../payload/user-request.payload';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User> = new BehaviorSubject(defaultUser);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.loadSelf();
    this.user.subscribe(u => authService.setUsernameInStorage(u.username));
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
      this.httpClient.get<User>(serverUrl + 'users/self').subscribe(u => {
        this.user.next(u);
      });
    }
  }
}
