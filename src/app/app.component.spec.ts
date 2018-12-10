import { ItemsComponent } from './items/items.component';

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';

import { routingModule } from './app.routing';

import { TestAllDeclarations, TestCommonImports } from '../app/_shared/helpers/test.helper';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...TestAllDeclarations,
      ],
      imports: [
        ...TestCommonImports,
        routingModule,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
