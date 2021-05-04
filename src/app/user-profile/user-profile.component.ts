import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.sevice';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // @ts-ignore
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user.subscribe(u => this.user = u);
  }
}
