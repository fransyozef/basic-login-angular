import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl, Validator, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AuthService } from '../_auth/services/auth.service';
import { routingModule } from '../app.routing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { APP_BASE_HREF } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        DashboardComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterModule,
        routingModule,
      ],
      providers : [
        HttpClient,
        AuthService,
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
