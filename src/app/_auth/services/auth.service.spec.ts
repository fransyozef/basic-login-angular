import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { AuthService } from './auth.service';

describe('AuthService', () => {


  let service: AuthService;


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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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

  it('getToken() return string \'mockToken\'' , () => {
    localStorage.clear();
    localStorage.setItem('token' , 'mockToken');
    service.resolveToken();
    expect(service.getToken()).toEqual('mockToken');
  });

  it('resolveToken() return true' , () => {
    localStorage.clear();
    localStorage.setItem('token' , 'mockToken');
    expect(service.resolveToken()).toBeTruthy();
  });

  it('!resolveToken() return false' , () => {
    localStorage.clear();
    expect(service.resolveToken()).toBeFalsy();
  });

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
