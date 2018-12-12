import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TestCommonDeclarations , TestCommonImports, TestItemData1 } from '../../_shared/helpers/test.helper';

import { APP_BASE_HREF } from '@angular/common';

import { routingModule } from '../../app.routing';

import { ItemsService } from '../_services/items.service';
import { ItemsListItemComponent } from './items-list-item.component';
import { ItemModel } from '../_models/item.model';

describe('ItemsListItemComponent', () => {

  let component: ItemsListItemComponent;
  let fixture: ComponentFixture<ItemsListItemComponent>;
  // let comp    = fixture.componentInstance;

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
        HttpClient,
        ItemsService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListItemComponent);
    component = fixture.componentInstance;

    // component.item = TestItemData1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
