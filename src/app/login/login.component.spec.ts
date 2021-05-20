import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { routingModule } from '../app.routing';
import { APP_BASE_HREF } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
import { TestCommonDeclarations, TestCommonImports , TestAuthServices } from '../_shared/helpers/test.helper';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { LoginComponent } from './login.component';
// import { AuthService } from '../_auth/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let httpMock: HttpTestingController;

  const userData = {
    fullname : 'mock fullname',
    email : 'mock@me.com',
    username : 'mock@me.com',
  };

  const mockToken  = 'token_1234567890';

  const loginResponse = {
    token : mockToken,
    user : userData
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...TestCommonDeclarations,
      ],
      imports: [
        ...TestCommonImports,
        HttpClientTestingModule,
        routingModule,
      ],
      providers : [
        ...TestAuthServices,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check username and password formgroup fields', () => {
    it('loginForm formgroup should have username field', () => {
      const field = component.loginForm.get('username');
      expect(field).toBeTruthy();
    });

    it('loginForm formgroup should have password field', () => {
      const field = component.loginForm.get('password');
      expect(field).toBeTruthy();
    });
  });

  it('formdata not set, should not be able to submit', () => {
    component.loginForm.reset();
    component.onSubmitButtonClicked();
    expect(component.error).toBeFalsy();
  });

  // it('formdata set, should be able to submit', () => {
  //   component.loginForm.get('username').patchValue('mock@mock.nl');
  //   component.loginForm.get('password').patchValue('mockpassword');
  //   component.onSubmitButtonClicked();

  //   // const t  = component.error && component.processing ? true : false;
  //   // console.log(t);

  //   const req = httpMock.expectOne('/api/auth/login');
  //   expect(req.request.method).toBe('POST');
  //   req.flush(loginResponse);

  //   expect(component.error && component.processing).toBeFalsy();
  // });

});
