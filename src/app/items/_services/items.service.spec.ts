import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ItemsService } from './items.service';

describe('ItemsService', () => {

  let service: ItemsService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers : [
        HttpClient,
        ItemsService,
      ]
    });

  });

  it('should be created', () => {
    service = TestBed.get(ItemsService);
    expect(service).toBeTruthy();
  });
});
