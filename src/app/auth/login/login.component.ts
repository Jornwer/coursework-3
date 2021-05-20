import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {throwError} from 'rxjs';
import {LoginRequestPayload} from '../../shared/payload/login-request.payload';
import {UserService} from '../../shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared/auth.styles.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  authRequestPayload: LoginRequestPayload;
  isError = false;
  showPassword = false;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router, private userService: UserService) {
    this.isError = false;
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.pattern('[\\w-.]{3,31}'), Validators.required]),
      password: new FormControl('', [Validators.pattern('[\\\x21-\\\x7E]{8,64}'), Validators.required])
    });
    this.authRequestPayload = {
      username: '',
      password: ''
    };
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

  login(): void {
    this.authRequestPayload.username = this.loginForm.get('username')?.value.trim();
    this.authRequestPayload.password = this.loginForm.get('password')?.value.trim();

    this.authService.login(this.authRequestPayload).subscribe(() => {
      this.isError = false;
      this.userService.loadSelf();
      this.router.navigateByUrl('');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
