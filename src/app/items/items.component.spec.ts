import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { routingModule } from '../app.routing';
import { APP_BASE_HREF } from '@angular/common';

import { TestCommonDeclarations , TestCommonImports } from '../_shared/helpers/test.helper';

import { ItemsComponent } from './items.component';
import { ItemsService } from './_services/items.service';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ...TestCommonDeclarations,
      ],
      imports: [
        ...TestCommonImports,
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
