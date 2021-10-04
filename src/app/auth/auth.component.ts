import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExchangeDataService } from '../exchange-data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  signInForm!: FormGroup;
  signUpForm!: FormGroup;

  constructor(private exchangeData: ExchangeDataService) {}

  ngOnInit() {
    this.signInForm = new FormGroup({
      emailSignIn: new FormControl('', [Validators.required, Validators.email]),
      passwordSignIn: new FormControl('', [Validators.required]),
    });

    this.signUpForm = new FormGroup({
      emailSignUp: new FormControl('', [Validators.required, Validators.email]),
      passwordSignUp: new FormControl('', [Validators.required]),
    });
  }

  get emailSignIn() {
    return this.signInForm.get('emailSignIn');
  }
  get passwordSignIn() {
    return this.signInForm.get('passwordSignIn');
  }

  get emailSignUp() {
    return this.signUpForm.get('emailSignUp');
  }
  get passwordSignUp() {
    return this.signUpForm.get('passwordSignUp');
  }

  trySignIn(): void {
    this.signInForm.disable();
    const body: object = {
      email: this.signInForm.value.emailSignIn,
      password: this.signInForm.value.passwordSignIn,
    };

    this.exchangeData.sendData('https://reqres.in/api/login', body, 'signIn');
  }

  trySignUp(): void {
    const body: object = {
      email: this.signUpForm.value.emailSignUp,
      password: this.signUpForm.value.passwordSignUp,
    };

    this.exchangeData.sendData('https://reqres.in/api/register', body);
  }
}
