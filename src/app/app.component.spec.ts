import { ItemsComponent } from './items/items.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { routingModule } from './app.routing';
import { HeaderComponent } from './_shared/ui/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './_shared/ui/layout/layout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './_shared/ui/footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { ItemAddEditComponent } from './items/item-add-edit/item-add-edit.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { ItemsListItemComponent } from './items/items-list-item/items-list-item.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';

import { TestAllDeclarations } from '../app/_shared/helpers/test.helper';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...TestAllDeclarations,
      ],
      imports: [
        RouterModule,
        HttpClientTestingModule,
        routingModule,
        ReactiveFormsModule,
        FormsModule,
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
