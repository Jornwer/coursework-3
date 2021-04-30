import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {throwError} from 'rxjs';
import {LoginRequestPayload} from '../shared/login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared/auth.styles.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  authRequestPayload: LoginRequestPayload;
  isError = false;
  showPassword = false;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.isError = false;
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

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required,
                                                          Validators.minLength(3),
                                                          Validators.maxLength(32)]),
      password: new FormControl('', [Validators.required,
                                                          Validators.minLength(8),
                                                          Validators.maxLength(32)])
    });
  }

  login(): void {
    this.authRequestPayload.username = this.loginForm.get('username')?.value.trim();
    this.authRequestPayload.password = this.loginForm.get('password')?.value.trim();

    this.authService.login(this.authRequestPayload).subscribe(() => {
      this.isError = false;
      this.router.navigateByUrl('');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
