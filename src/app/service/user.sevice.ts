import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {serverUrl} from '../shared/server.url';
import {Observable} from 'rxjs';
import {UserRequestPayload} from '../auth/shared/user-request.payload';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  @Output() user: EventEmitter<User> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<User>(serverUrl + 'users/self').subscribe(u => {
      this.user.emit(u);
    });
  }

  updateSelf(userRequestPayload: UserRequestPayload): Observable<User> {
    return this.httpClient.post<User>(serverUrl + 'users/update/self', userRequestPayload)
      .pipe(
        tap(data => {
          this.user.emit(data);
        })
      );
  }
}
