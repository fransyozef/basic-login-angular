import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthService } from 'src/app/_auth/services/auth.service';
import { routingModule } from 'src/app/app.routing';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { UiModule } from '../ui.module';
import { LoginComponent } from 'src/app/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { ItemsComponent } from 'src/app/items/items.component';
import { ItemsListComponent } from 'src/app/items/items-list/items-list.component';
import { ItemsListItemComponent } from 'src/app/items/items-list-item/items-list-item.component';
import { ItemAddEditComponent } from 'src/app/items/item-add-edit/item-add-edit.component';
import { ItemEditComponent } from 'src/app/items/item-edit/item-edit.component';
import { ItemsService } from 'src/app/items/_services/items.service';
import { LogoutComponent } from 'src/app/logout/logout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        LoginComponent,
        LogoutComponent,
        ItemsComponent,
        ItemsListComponent,
        ItemsListItemComponent,
        ItemEditComponent,
        ItemAddEditComponent,
      ],
      imports: [
        RouterModule,
        HttpClientTestingModule,
        routingModule,
        ReactiveFormsModule,
        FormsModule,
        // DashboardComponent,
      ],
      providers: [
        AuthService,
        ItemsService,
        HttpClient,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
