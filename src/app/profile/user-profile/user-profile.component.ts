import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/model/user';
import {UserService} from '../../shared/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user.subscribe(u => {
      this.user = u;
    });
  }
}
