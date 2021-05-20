import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {defaultUser} from '../../shared/model/user';
import {UserService} from '../../shared/service/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRequestPayload} from '../../shared/payload/user-request.payload';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss', '../../shared/style/loader.scss', '../../auth/shared/auth.styles.scss']
})
export class EditUserComponent {

  user = defaultUser;
  form: FormGroup;
  isError = false;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    activatedRoute.params.subscribe(p => {
      userService.findUser(p.id).subscribe(u => {
        this.user = u;
        this.form.get('username')?.setValue(this.user.username);
        this.form.get('email')?.setValue(this.user.email);
        this.form.get('firstName')?.setValue(this.user.firstName);
        this.form.get('lastName')?.setValue(this.user.lastName);
      });
    });
    this.form = new FormGroup({
      username: new FormControl('', [Validators.pattern('[\\w-.]{3,31}'), Validators.required]),
      email: new FormControl('', [Validators.maxLength(63),
                                                       Validators.minLength(3),
                                                       Validators.email]),
      firstName: new FormControl('', [Validators.pattern('([A-ZА-Я][a-zа-я]{1,30})'), Validators.required]),
      lastName: new FormControl('', [Validators.pattern('([A-ZА-Я][a-zа-я]{1,30})'), Validators.required])
    });
  }

  submit(): void {
    const userRequestPayload: UserRequestPayload = {
      username:  this.form.get('username')?.valid  ? this.form.get('username')?.value  : this.user?.username,
      password: '',
      email:     this.form.get('email')?.valid     ? this.form.get('email')?.value     : this.user?.email,
      firstName: this.form.get('firstName')?.valid ? this.form.get('firstName')?.value : this.user?.firstName,
      lastName:  this.form.get('lastName')?.valid  ? this.form.get('lastName')?.value  : this.user?.lastName,
      organizationId: this.user?.organization?.id
    };
    this.userService.updateSelf(userRequestPayload).subscribe(() => {
      this.router.navigateByUrl('/');
    }, () => this.isError = true);
  }
}
