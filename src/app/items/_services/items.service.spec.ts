import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ItemsService } from './items.service';
import { ItemModel } from '../_models/item.model';

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
    service = TestBed.get(ItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('clear() should return empty array' , () => {
    service.clear();
    expect(service.getAll()).toEqual([]);
  });

  it('addItem() should add an item' , () => {
    service.clear();

    const mockData: ItemModel = {
      id: 1,
      title : 'mock title',
      description : 'mock description'
    };

    service.addItem(mockData);

    const test  = service.get(1);
    expect(test).toEqual(mockData);

  });

  it('deleteItem() should delete an item' , () => {
    service.clear();

    const mockData: ItemModel = {
      id: 1,
      title : 'mock title',
      description : 'mock description'
    };

    service.addItem(mockData);

    const test  = service.deleteItem(1);
    expect(test).toBeTruthy();

  });

  it('deleteItem() should remove the id from the array' , () => {
    service.clear();

    const mockData: ItemModel = {
      id: 1,
      title : 'mock title',
      description : 'mock description'
    };

    service.addItem(mockData);
    service.deleteItem(1);

    const test  = service.get(1);
    expect(test).toBeFalsy();

  });

  it('updateItem() should true' , () => {
    service.clear();

    const mockData: ItemModel = {
      id: 1,
      title : 'mock title',
      description : 'mock description'
    };

    service.addItem(mockData);

    const mockDataNew: ItemModel = {
      id: 1,
      title : 'mock title update',
      description : 'mock description update'
    };

    const test  = service.updateItem(1 , mockDataNew);
    expect(test).toBeTruthy();

  });

  it('updateItem() should return the new updated item' , () => {
    service.clear();

    const mockData: ItemModel = {
      id: 1,
      title : 'mock title',
      description : 'mock description'
    };

    service.addItem(mockData);

    const mockDataNew: ItemModel = {
      id: 1,
      title : 'mock title update',
      description : 'mock description update'
    };

    service.updateItem(1 , mockDataNew);
    const test  = service.get(1);
    expect(test).toEqual(mockDataNew);

  });



});
