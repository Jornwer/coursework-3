import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {AuthRequestPayload} from '../shared/auth-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../shared/login.styles.scss']
})
export class SignupComponent implements OnInit {

  authRequestPayload: AuthRequestPayload;
  // @ts-ignore
  signupForm: FormGroup;
  isError = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required,
                                                          Validators.minLength(3),
                                                          Validators.maxLength(32)]),
      password: new FormControl('', [Validators.required,
                                                          Validators.minLength(8),
                                                          Validators.maxLength(32)])
    });
  }

  signup(): void {
    this.authRequestPayload.username = this.signupForm.get('username')?.value.trim();
    this.authRequestPayload.password = this.signupForm.get('password')?.value.trim();

    this.authService.signup(this.authRequestPayload)
      .subscribe(() => {
        this.isError = false;
        const login = this.authService.login(this.authRequestPayload)
          .subscribe(() => login.unsubscribe());
        this.router.navigate(['/']);
      }, error => {
        this.isError = true;
        console.log(error);
      });
  }
}
