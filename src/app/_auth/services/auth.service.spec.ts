import { TestBed, async, inject } from '@angular/core/testing';
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
    it('hasToken() should return true' , () => {
      localStorage.clear();
      localStorage.setItem('token' , 'mockToken');
      service.resolveToken();
      expect(service.hasToken()).toBeTruthy();
    });
  
    it('!hasToken() should return false' , () => {
      localStorage.clear();
      service.resolveToken();
      expect(service.hasToken()).toBeFalsy();
    });
  });

  it('getToken() return string ' + mockToken , () => {
    localStorage.clear();
    localStorage.setItem('token' , mockToken);
    service.resolveToken();
    expect(service.getToken()).toEqual(mockToken);
  });

  describe('resolveToken()' , () => {
    it('resolveToken() return true' , () => {
      localStorage.clear();
      localStorage.setItem('token' , mockToken);
      expect(service.resolveToken()).toBeTruthy();
    });
  
    it('!resolveToken() return false' , () => {
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

    it('should return user login data', () => {
      service.login(loginData).then(
        (status) => {
          expect(status).toEqual(userData);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });


    it('should return token ' + mockToken, () => {
      service.login(loginData).then(
        (status) => {
          expect(service.getToken()).toEqual(mockToken);

        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    it('should set userdata ', () => {
      service.login(loginData).then(
        (status) => {
          expect(service.getUserData()).toEqual(userData);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    it('should set token localstorage ', () => {
      service.login(loginData).then(
        (status) => {
          expect(localStorage.getItem('token')).toEqual(mockToken);
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    it('should set usermeta localstorage ', () => {
      service.login(loginData).then(
        (status) => {
          expect(localStorage.getItem('usermeta')).toBeTruthy();
        }
      );

      const req = httpMock.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(loginResponse);
    });

    it('should validate token on server', () => {

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
    it('should return true ', () => {
      service.logout().then(
        (status) => {
          expect(status).toBeTruthy();
        }
      );

      const req = httpMock.expectOne('/api/auth/logout');
      expect(req.request.method).toBe('GET');
      req.flush(loginResponse);
    });

    it('should clear token ', () => {

      service.logout().then(
        (status) => {
          expect(service.getToken()).toBeFalsy();
        }
      );

      const req = httpMock.expectOne('/api/auth/logout');
      expect(req.request.method).toBe('GET');
      req.flush(loginResponse);
    });

    it('should clear token localstorage ', () => {

      service.logout().then(
        (status) => {
          expect(localStorage.getItem('token')).toBeFalsy();
        }
      );

      const req = httpMock.expectOne('/api/auth/logout');
      expect(req.request.method).toBe('GET');
      req.flush(loginResponse);
    });

    it('should clear userdata', () => {

      service.logout().then(
        (status) => {
          expect(service.getUserData()).toBeFalsy();
        }
      );

      const req = httpMock.expectOne('/api/auth/logout');
      expect(req.request.method).toBe('GET');
      req.flush(loginResponse);
    });

    it('should clear usermeta localstorage', () => {

      service.logout().then(
        (status) => {
          expect(localStorage.getItem('usermeta')).toBeFalsy();
        }
      );

      const req = httpMock.expectOne('/api/auth/logout');
      expect(req.request.method).toBe('GET');
      req.flush(loginResponse);
    });

  });


});
