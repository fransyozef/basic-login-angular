import { LoginPage } from './login.po';
import { FeatureItems } from './10_feature-items.po';
import { browser, protractor } from 'protractor';


function hasCssClass(element, cls: string) {
  return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
  });
};

describe('Feature Items page', () => {
  let loginPage: LoginPage;
  let page: FeatureItems;

  describe('Do login', () => {

    const EC = protractor.ExpectedConditions;

    beforeEach(() => {

      page  = new FeatureItems();

      loginPage = new LoginPage();
      loginPage.navigateTo();
    });
  
    it('should have a loginform', () => {
      expect(loginPage.getForm()).toBeTruthy();
    });
  
    it('should have a submitbutton', () => {
      expect(loginPage.submitButton).toBeTruthy();
    });

    describe('To Dashboard', () => {
      beforeEach(() => {
        loginPage.login();
      });

      it('submitbutton should be enabled', () => {
        expect(page.submitButton.getAttribute('disabled')).not.toBeTruthy();
      });

      describe('To Items', () => {
        beforeEach(() => {
          loginPage.submitButton.click();

          browser.wait(EC.urlContains('dashboard') , 2000);
          page.navigateTo();
        });

        it('should be at items main page', () => {
          browser.wait(EC.urlContains('items') , 2000);
          expect(true).toBeTruthy();
          browser.sleep(1000);
        });
      });

    });
    

  });



});
