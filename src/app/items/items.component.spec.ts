import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routingModule } from '../app.routing';
import { APP_BASE_HREF } from '@angular/common';

import { TestCommonDeclarations } from '../_shared/helpers/test.helper';

import { ItemsComponent } from './items.component';
import { ItemsService } from './_services/items.service';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ...TestCommonDeclarations,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterModule,
        routingModule,
      ],
      providers : [
        // HttpClient,
        ItemsService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
