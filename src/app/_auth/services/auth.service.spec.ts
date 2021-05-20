import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



import { AuthService } from './auth.service';

describe('AuthService', () => {


  let service: AuthService;
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

  const loginData = {
    username : 'mock@me.com',
    password : 'mockpassword',
  };

  const validateTokenResponse = {
    user : userData
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers : [
        HttpClient,
        AuthService,
      ]
    });

    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('hasToken()' , () => {
    it('hasToken() should return true when token is set' , () => {
      localStorage.clear();
      localStorage.setItem('token' , 'mockToken');
      service.resolveToken();
      expect(service.hasToken()).toBeTruthy();
    });

    it('hasToken() should return false when token is not set' , () => {
      localStorage.clear();
      service.resolveToken();
      expect(service.hasToken()).toBeFalsy();
    });
  });

  it('getToken() should return string ' + mockToken , () => {
    localStorage.clear();
    localStorage.setItem('token' , mockToken);
    service.resolveToken();
    expect(service.getToken()).toEqual(mockToken);
  });

  describe('resolveToken()' , () => {
    it('resolveToken() should return true when localstorage token is set' , () => {
      localStorage.clear();
      localStorage.setItem('token' , mockToken);
      expect(service.resolveToken()).toBeTruthy();
    });

    it('resolveToken() should return false when localstorage token is empty' , () => {
      localStorage.clear();
      expect(service.resolveToken()).toBeFalsy();
    });
  });

  describe('clearData()' , () => {
    it('clearData() should clear user data' , () => {
      service.clearData();
      expect(service.getUserData()).toBeNull();
    });

    it('clearData() should clear token data' , () => {
      service.clearData();
      expect(service.getToken()).toBeNull();
    });

    it('clearData() should clear local storage' , () => {
      service.clearData();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('login()' , () => {

    it('login() should return user login data', () => {
      service.login(loginData).then(
        (status) => {
          expect(status).toEqual(userData);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });


    it('getToken() should return token ' + mockToken + ' after login()', () => {
      service.login(loginData).then(
        (status) => {
          expect(service.getToken()).toEqual(mockToken);

        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    it('getUserData() should set userdata after login()', () => {
      service.login(loginData).then(
        (status) => {
          expect(service.getUserData()).toEqual(userData);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    it('localstorage token should be set after login()', () => {
      service.login(loginData).then(
        (status) => {
          expect(localStorage.getItem('token')).toEqual(mockToken);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    it('localstorage usermeta should be set after login()', () => {
      service.login(loginData).then(
        (status) => {
          expect(localStorage.getItem('usermeta')).toBeTruthy();
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    it('validateTokenOnServer() should return user data from server', () => {

      service.login(loginData).then(
        (status) => {

          service.validateTokenOnServer().subscribe(
            (statusToken) => {
              expect(statusToken).toEqual(userData);
            }
          );

          const req1 = httpMock.expectOne('/api/auth/validate-token');
          expect(req1.request.method).toBe('GET');
          req1.flush(validateTokenResponse);

        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

  });

  describe('logout()' , () => {

    it('logout() should return true ', () => {
      service.logout().then(
        (status) => {
          expect(status).toBeTruthy();
        }
      );

      const req = httpMock.expectOne('/api/auth/logout');
      expect(req.request.method).toBe('GET');
      req.flush(loginResponse);
    });

    it('should clear token after logout', () => {

      service.login(loginData).then(
        (loginStatus) => {
          service.logout().then(
            (logoutStatus) => {
              expect(service.getToken()).toBeFalsy();
            }
          );
          const req1 = httpMock.expectOne('/api/auth/logout');
          expect(req1.request.method).toBe('GET');
          req1.flush(loginResponse);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);

    });

    it('should clear localstorage token after logout ', () => {

      service.login(loginData).then(
        (loginStatus) => {
          service.logout().then(
            (logoutStatus) => {
              expect(localStorage.getItem('token')).toBeFalsy();
            }
          );
          const req1 = httpMock.expectOne('/api/auth/logout');
          expect(req1.request.method).toBe('GET');
          req1.flush(loginResponse);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);

    });

    it('should clear userdata after logout', () => {

      service.login(loginData).then(
        (loginStatus) => {
          service.logout().then(
            (logoutStatus) => {
              expect(service.getUserData()).toBeFalsy();
            }
          );
          const req1 = httpMock.expectOne('/api/auth/logout');
          expect(req1.request.method).toBe('GET');
          req1.flush(loginResponse);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);

    });

    it('should clear localstorage usermeta after logout', () => {

      service.login(loginData).then(
        (loginStatus) => {
          service.logout().then(
            (logoutStatus) => {
              expect(localStorage.getItem('usermeta')).toBeFalsy();
            }
          );
          const req1 = httpMock.expectOne('/api/auth/logout');
          expect(req1.request.method).toBe('GET');
          req1.flush(loginResponse);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);

    });

  });


});
