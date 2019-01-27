import { LoginPage } from './login.po';
import { browser } from 'protractor';


function hasCssClass(element, cls: string) {
  return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
  });
};

describe('Login page', () => {
  let page: LoginPage;

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

  it('should have username and password inputfields', () => {
    expect(page.inputEmail).toBeTruthy();
    expect(page.inputPassword).toBeTruthy();
  });

  describe('Check invalid validations', () => {

    beforeEach(() => {
      page.inputEmail.clear();
      page.inputPassword.clear();

      page.inputEmail.sendKeys();
      page.inputPassword.sendKeys();
    });

    it('email field and label should have required class', () => {
      expect(page.inputEmail.getAttribute('class')).toMatch('required');
      expect(page.inputEmailLabel.getAttribute('class')).toMatch('required');
    });

    it('password field and label should have required class', () => {
      expect(page.inputPassword.getAttribute('class')).toMatch('required');
      expect(page.inputPasswordLabel.getAttribute('class')).toMatch('required');
    });

    it('submitbutton should be disabled', () => {
      expect(page.submitButton.getAttribute('disabled')).toBeTruthy();
    });

    describe('Enter invalid email', () => {

      beforeEach(() => {
        page.inputEmail.clear();
        page.inputEmail.sendKeys(page.notCorrectEmail);
      });

      it('email field should have required class', () => {
        expect(page.inputEmail.getAttribute('class')).toMatch('required');
        expect(page.inputEmailLabel.getAttribute('class')).toMatch('required');
      });

      it('submitbutton should be disabled', () => {
        expect(page.submitButton.getAttribute('disabled')).toBeTruthy();
      });

    });

  });

  describe('Check valid validations', () => {

    beforeEach(() => {
       page.login();
    });

    it('email field and label should NOT have required class', () => {
      expect(page.inputEmail.getAttribute('class')).not.toMatch('required');
      expect(page.inputEmailLabel.getAttribute('class')).not.toMatch('required');
    });

    it('password field and label should NOT have required class', () => {
      expect(page.inputPassword.getAttribute('class')).not.toMatch('required');
      expect(page.inputPasswordLabel.getAttribute('class')).not.toMatch('required');
    });

    it('submitbutton should be enabled', () => {
      expect(page.submitButton.getAttribute('disabled')).toBeFalsy();
    });

  });


});
