import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/model/user';
import {UserService} from '../../shared/service/user.service';
import {AuthService} from '../../shared/service/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.user.subscribe(u => {
      this.user = u;
    });
  }

  deleteAccount(): void {
    this.userService.deleteSelf().subscribe();
    this.authService.logout();
  }
}
