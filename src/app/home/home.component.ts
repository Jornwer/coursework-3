import { Component } from '@angular/core';
import {AuthService} from '../auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  isLoggedIn: boolean | undefined;

  constructor(private authService: AuthService) {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }
}
