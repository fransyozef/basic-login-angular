import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { routingModule } from '../app.routing';
import { APP_BASE_HREF } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
import { TestCommonDeclarations, TestCommonImports , TestAuthServices } from '../_shared/helpers/test.helper';


import { LoginComponent } from './login.component';
// import { AuthService } from '../_auth/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...TestCommonDeclarations,
      ],
      imports: [
        ...TestCommonImports,
        routingModule,
      ],
      providers : [
        ...TestAuthServices,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
