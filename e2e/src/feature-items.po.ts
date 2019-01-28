import { browser, by, element } from 'protractor';

export class FeatureItems {

  currentComponent  = element(by.tagName('app-items'));
  appItemAddEditComponent  = this.getCurrentComponent().element(by.tagName('app-item-add-edit'));
  appItemsList  = this.getCurrentComponent().element(by.tagName('app-items-list'));

  appItemAddEditComponent_submitbutton = this.appItemAddEditComponent.element(by.css('button[class="btn btn-primary btn-block submitbutton"]'));

  

  getCurrentComponent() {
    return this.currentComponent;
  }

  navigateTo() {
    return browser.get('/items');
  }

}
