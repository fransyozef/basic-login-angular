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

  });

  it('should be created', () => {
    service = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

});
