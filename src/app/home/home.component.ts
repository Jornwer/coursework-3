import { Component } from '@angular/core';
import {AuthService} from '../auth/shared/auth.service';
import {defaultUser} from '../shared/model/user';
import {UserService} from '../shared/service/user.sevice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  isLoggedIn: boolean | undefined;
  user = defaultUser;

  constructor(private authService: AuthService, private userService: UserService) {
    authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    userService.user.subscribe(u => this.user = u);
  }
}
