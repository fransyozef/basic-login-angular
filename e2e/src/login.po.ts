import { browser, by, element } from 'protractor';

export class LoginPage {

  inputEmail  = element(by.css('input[formControlName="username"]'));
  inputEmailLabel  = element(by.css('label[for="inputEmail"]'));

  inputPassword   = element(by.css('input[formControlName="password"]'));
  inputPasswordLabel  = element(by.css('label[for="inputPassword"]'));

  submitButton  = element(by.id('submitButton'));

  navigateTo() {
    return browser.get('/login');
  }

  getForm() {
    return element(by.css('[formGroup]="loginForm"'));
  }
}