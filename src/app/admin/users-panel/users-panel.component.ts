import { Component } from '@angular/core';
import {UserService} from '../../shared/service/user.service';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss', '../../shared/style/loader.scss']
})
export class UsersPanelComponent {

  users: User[] = new Array<User>();

  constructor(private userService: UserService) {
    userService.findAll().subscribe(users => this.users = users);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
     this.users.filter(u => u.id !== id);
    });
  }

  promoteUser(id: number): void {
    this.userService.promoteUser(id).subscribe(() => this.users.forEach(u => {
      if (u.id === id) {
        u.role = 'ADMIN';
      }}));
  }

  sortByRole(): void {
    this.users.sort((a, b) => a.role.localeCompare(b.role));
  }

  sortByFullName(): void {
    this.users.sort((a, b) => a.firstName.concat(' ',  a.lastName)
      .localeCompare(b.firstName.concat(' ',  b.lastName)));
  }

  sortByEmail(): void {
    this.users.sort((a, b) => a.email.localeCompare(b.email));
  }

  sortByUsername(): void {
    this.users.sort((a, b) => a.username.localeCompare(b.username));
  }
}
