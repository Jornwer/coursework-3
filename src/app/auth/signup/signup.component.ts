import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {UserRequestPayload} from '../../shared/payload/user-request.payload';
import {UserService} from '../../shared/service/user.sevice';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../shared/auth.styles.scss']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: UserRequestPayload;
  // @ts-ignore
  signupForm: FormGroup;
  isError = false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.signupRequestPayload = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      organizationId: null
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

  getInputType(): string {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  signup(): void {
    this.signupRequestPayload.username = this.signupForm.get('username')?.value.trim();
    this.signupRequestPayload.password = this.signupForm.get('password')?.value.trim();
    this.signupRequestPayload.lastName = this.signupForm.get('lastName')?.value.trim();
    this.signupRequestPayload.firstName = this.signupForm.get('firstName')?.value.trim();
    this.signupRequestPayload.email = this.signupForm.get('email')?.value.trim();

    this.authService.signup(this.signupRequestPayload)
      .subscribe(() => {
        this.isError = false;
        this.userService.loadSelf();
        this.router.navigate(['/']);
      }, error => {
        this.isError = true;
        console.log(error);
      });
  }
}
