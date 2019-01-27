import { LoginPage } from './login.po';
import { browser , protractor } from 'protractor';


function hasCssClass(element, cls: string) {
  return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
  });
}

describe('* Login page', () => {
  const page: LoginPage = new LoginPage();

  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page.navigateLogout();
    browser.wait(EC.urlContains('login') , 2000);
  });

  it('should have a login component', () => {
    expect(page.getCurrentComponent().isPresent()).toBeTruthy();
  });

  it('should have a loginform', () => {
    expect(page.getForm()).toBeTruthy();
  });

  it('should have a submitbutton', () => {
    expect(page.submitButton.isPresent()).toBeTruthy();
  });

  it('should have username and password inputfields', () => {
    expect(page.inputEmail.isPresent()).toBeTruthy();
    expect(page.inputPassword.isPresent()).toBeTruthy();
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

    it('submitbutton should be disabled', () => {
      expect(page.submitButton.getAttribute('disabled')).toBeTruthy();
    });

    describe('Enter invalid email', () => {

      beforeEach(() => {
        page.inputEmail.clear();
        page.inputEmail.sendKeys(page.mockData.incorrectEmail);
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
