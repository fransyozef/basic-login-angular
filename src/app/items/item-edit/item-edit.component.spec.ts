import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditComponent } from './item-edit.component';

describe('ItemEditComponent', () => {
  let component: ItemEditComponent;
  let fixture: ComponentFixture<ItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
