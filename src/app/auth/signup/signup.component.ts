import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../shared/login.styles.scss']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  // @ts-ignore
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signupRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signup(): void {
    // @ts-ignore
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    // @ts-ignore
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      });
  }
}
