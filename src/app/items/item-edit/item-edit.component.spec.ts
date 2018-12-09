import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { TestItemsDeclarations } from '../../_shared/helpers/test.helper';
import { ItemEditComponent } from './item-edit.component';

describe('ItemEditComponent', () => {
  let component: ItemEditComponent;
  let fixture: ComponentFixture<ItemEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...TestItemsDeclarations,
       ],
       imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
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
