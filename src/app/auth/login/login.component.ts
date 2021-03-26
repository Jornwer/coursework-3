import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from './login-request.payload';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared/login.styles.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError = false;
  usernameStatus = 'status-danger';

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.isError = false;
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
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
    // @ts-ignore
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    // @ts-ignore
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(() => {
      this.isError = false;
      this.router.navigateByUrl('');
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }

}
