import { LoginPage } from './login.po';
import { FeatureItems } from './feature-items.po';
import { browser, protractor } from 'protractor';


function hasCssClass(element, cls: string) {
  return element.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
  });
}

describe('* Feature Items page', () => {
  const loginPage: LoginPage = new LoginPage();
  const page: FeatureItems = new FeatureItems();

  const EC = protractor.ExpectedConditions;

  describe('Do login', () => {


    beforeEach(() => {
      loginPage.navigateLogout();

      browser.wait(EC.urlContains('login') , 2000);
      loginPage.navigateTo();
    });

    describe('To Dashboard', () => {
      beforeEach(() => {
        loginPage.login();
      });

      describe('To Items', () => {
        beforeEach(() => {
          loginPage.submitButton.click();

          browser.wait(EC.urlContains('dashboard') , 2000);
          page.navigateTo();
        });

        it('should be at items main page', () => {
          browser.wait(EC.urlContains('items') , 5000);
          expect(true).toBeTruthy();
          // browser.sleep(5000);
        });


        describe('Add item flow', () => {

          it('should have app-item-add-edit component', () => {
            expect(page.appItemAddEditComponent.isPresent()).toBeTruthy();
          });

          it('should have submitbutton', () => {
            expect(page.appItemAddEditComponent_submitbutton.isPresent()).toBeTruthy();
          });

          it('submitbutton should be disabled', () => {
            expect(page.appItemAddEditComponent_submitbutton.getAttribute('disabled')).toBeTruthy();
          });

        });



      });

    });


  });



});
