import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListItemComponent } from './items-list-item.component';

describe('ItemsListItemComponent', () => {
  let component: ItemsListItemComponent;
  let fixture: ComponentFixture<ItemsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
