import { browser, by, element } from 'protractor';

export class LoginPage {
  
  correctEmail  = 'my@email.com';
  notCorrectEmail  = 'notACorrectEmail';
  
  correctPassword  = 'aVerySecretPassword';
  
  currentComponent  = element(by.tagName('app-login'));

  inputEmail  = this.getCurrentComponent().element(by.css('input[formControlName="username"]'));
  inputEmailLabel  = this.getCurrentComponent().element(by.css('label[for="inputEmail"]'));

  inputPassword   = this.getCurrentComponent().element(by.css('input[formControlName="password"]'));
  inputPasswordLabel  = this.getCurrentComponent().element(by.css('label[for="inputPassword"]'));

  submitButton  = this.getCurrentComponent().element(by.id('submitButton'));

  getCurrentComponent() {
    return this.currentComponent;
  }

  navigateTo() {
    return browser.get('/login');
  }

  navigateLogout() {
    return browser.get('/logout');
  }

  login() {
    this.inputEmail.clear();
    this.inputEmail.sendKeys(this.correctEmail);
    this.inputPassword.clear();
    this.inputPassword.sendKeys(this.correctPassword);
  }


  getForm() {
    return this.currentComponent.element(by.css('[formGroup]="loginForm"'));
  }
}