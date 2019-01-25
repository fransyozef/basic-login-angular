import { LoginPage } from './login.po';
import { browser } from 'protractor';

describe('Login page', () => {
  let page: LoginPage;

  const correctEmail  = 'my@email.com';
  const notCorrectEmail  = 'notACorrectEmail';

  const correctPassword  = 'aVerySecretEmail';

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should have a loginform', () => {
    page.navigateTo();
    expect(page.getForm()).toBeTruthy();
  });

  it('should have a submitbutton', () => {
    expect(page.submitButton).toBeTruthy();
  });

  it('should have empty data', () => {
    expect(page.inputEmail.getAttribute('value')).toBe('');
    expect(page.inputPassword.getAttribute('value')).toBe('');
  });

  describe('Check validations', () => {

    beforeEach(() => {
      page.inputEmail.clear();
      page.inputEmail.sendKeys('');

      page.inputPassword.clear();
      page.inputPassword.sendKeys('');
    });

    it('email field should have required class', () => {
      expect(page.inputEmailLabel.getAttribute('class')).toMatch('required');
    });

    it('password field should have required class', () => {
      expect(page.inputPasswordLabel.getAttribute('class')).toMatch('required');
    });

    describe('Enter incorrect email', () => {

      beforeEach(() => {
        page.inputEmail.sendKeys(notCorrectEmail);
        page.inputPassword.clear();
      });

      it('email label field should have required class', () => {
        expect(page.inputEmailLabel.getAttribute('class')).toMatch('required');
      });

      it('email field should have required class', () => {
        expect(page.inputEmail.getAttribute('class')).toMatch('required');
      });

      it('submitbutton should be disabled', () => {
        expect(page.submitButton.getAttribute('disabled')).toBeTruthy();
      });

    });

    describe('Enter correct email', () => {

      beforeEach(() => {
        page.inputEmail.clear();
        page.inputEmail.sendKeys(correctEmail);
        page.inputPassword.clear();
      });

      it('email label field should not have required class', () => {
        expect(page.inputEmailLabel.getAttribute('class')).not.toMatch('required');
      });

      it('email field should not have required class', () => {
        expect(page.inputEmail.getAttribute('class')).not.toMatch('required');
      });

    });

    describe('Did not entered password', () => {

      beforeEach(() => {
        page.inputEmail.clear();

        page.inputPassword.clear();
      });

      it('password label field should have required class', () => {
        expect(page.inputPasswordLabel.getAttribute('class')).toMatch('required');
      });

      it('password field should have required class', () => {
        expect(page.inputPassword.getAttribute('class')).toMatch('required');
      });

    });

    describe('Enter correct password', () => {

      beforeEach(() => {
        page.inputEmail.clear();

        page.inputPassword.clear();
        page.inputPassword.sendKeys(correctPassword);
      });

      it('password label field should not have required class', () => {
        expect(page.inputPasswordLabel.getAttribute('class')).not.toMatch('required');
      });

      it('password field should not have required class', () => {
        expect(page.inputPassword.getAttribute('class')).not.toMatch('required');
      });

    });

    describe('Enter correct email and password', () => {

      beforeEach(() => {
        page.inputEmail.clear();
        page.inputEmail.sendKeys(correctEmail);

        page.inputPassword.clear();
        page.inputPassword.sendKeys(correctPassword);
      });

      it('submitbutton should NOT be disabled', () => {
        expect(page.submitButton.getAttribute('disabled')).toBeFalsy();
      });


    });

  });





});
