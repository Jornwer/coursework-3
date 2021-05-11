import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/model/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/service/user.sevice';
import {UserRequestPayload} from '../../shared/payload/user-request.payload';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss',
              '../../auth/shared/auth.styles.scss']
})
export class SettingsComponent implements OnInit {

  // @ts-ignore
  user: User;
  // @ts-ignore
  changeForm: FormGroup;
  isError = false;
  showPassword = false;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.user.subscribe(u => this.user = u);
    this.changeForm = new FormGroup({
      username: new FormControl('', [Validators.required,
                                                          Validators.minLength(3),
                                                          Validators.maxLength(32)]),
      password: new FormControl('', [Validators.required,
                                                          Validators.minLength(8),
                                                          Validators.maxLength(32)]),
      email: new FormControl('', [Validators.required,
                                                       Validators.maxLength(32),
                                                       Validators.minLength(3),
                                                       Validators.email]),
      firstName: new FormControl('', [Validators.required,
                                                           Validators.maxLength(32),
                                                           Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required,
                                                          Validators.maxLength(32),
                                                          Validators.minLength(3)])
    });
  }

  change(): void {
    if (!this.validateInput()) {
      this.isError = true;
      return;
    }
    const userRequestPayload: UserRequestPayload = {
      username:  this.changeForm.get('username')?.valid  ? this.changeForm.get('username')?.value  : this.user?.username,
      password:  this.changeForm.get('password')?.valid  ? this.changeForm.get('password')?.value  : '',
      email:     this.changeForm.get('email')?.valid     ? this.changeForm.get('email')?.value     : this.user?.email,
      firstName: this.changeForm.get('firstName')?.valid ? this.changeForm.get('firstName')?.value : this.user?.firstName,
      lastName:  this.changeForm.get('lastName')?.valid  ? this.changeForm.get('lastName')?.value  : this.user?.lastName,
      organizationId: this.user?.organization?.id
    };
    this.userService.updateSelf(userRequestPayload).subscribe(() => {
      if (this.changeForm.get('username')?.valid || this.changeForm.get('password')?.valid) {
        this.authService.logout();
      }
      this.router.navigateByUrl('/');
    }, () => this.isError = true);
  }

  private validateInput(): boolean {
    const valid =
      (this.changeForm.get('username')?.value  === '' || this.changeForm.get('username')?.valid) &&
      (this.changeForm.get('password')?.value  === '' || this.changeForm.get('password')?.valid) &&
      (this.changeForm.get('lastName')?.value  === '' || this.changeForm.get('lastName')?.valid) &&
      (this.changeForm.get('firstName')?.value === '' || this.changeForm.get('firstName')?.valid) &&
      (this.changeForm.get('email')?.value     === '' || this.changeForm.get('email')?.valid);
    return valid as boolean;
  }

  getInputType(): string {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
