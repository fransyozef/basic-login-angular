import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {Component , ViewChild} from '@angular/core';
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

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...TestCommonDeclarations,
        TestHostComponent,
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

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;

    fixture = TestBed.createComponent(ItemsListItemComponent);
    component = fixture.componentInstance;

    // component.item = TestItemData1;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have an item using property binding from TestHostComponent', () => {
    testHostComponent.item = TestItemData1;
    testHostFixture.detectChanges();
    expect(testHostComponent.itemsListItemComponent.item).toEqual(TestItemData1);
  });


  @Component({
    selector: `app-host-component`,
    template: `<app-items-list-item [item]="item"></app-items-list-item>`
  })
  class TestHostComponent {

    item: ItemModel;

    @ViewChild(ItemsListItemComponent, /* TODO: add static flag */ {})
    public itemsListItemComponent: ItemsListItemComponent;
  }

});
