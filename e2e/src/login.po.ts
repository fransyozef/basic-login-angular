import { browser, by, element } from 'protractor';

export class LoginPage {

  correctEmail  = 'my@email.com';
  notCorrectEmail  = 'notACorrectEmail';

  correctPassword  = 'aVerySecretPassword';

  inputEmail  = element(by.css('input[formControlName="username"]'));
  inputEmailLabel  = element(by.css('label[for="inputEmail"]'));

  inputPassword   = element(by.css('input[formControlName="password"]'));
  inputPasswordLabel  = element(by.css('label[for="inputPassword"]'));

  submitButton  = element(by.id('submitButton'));

  navigateTo() {
    return browser.get('/login');
  }

  login() {
    this.inputEmail.clear();
    this.inputEmail.sendKeys(this.correctEmail);
    this.inputPassword.clear();
    this.inputPassword.sendKeys(this.correctPassword);
  }

  getForm() {
    return element(by.css('[formGroup]="loginForm"'));
  }
}