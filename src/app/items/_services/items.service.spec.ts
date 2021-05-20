import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestItemData1, TestItemData2 } from '../../_shared/helpers/test.helper';

import { ItemsService } from './items.service';
import { ItemModel } from '../_models/item.model';

describe('ItemsService', () => {

  let service: ItemsService;
  let httpMock: HttpTestingController;

  const mockDataItem1: ItemModel = TestItemData1;
  const mockDataItem2: ItemModel = TestItemData2;

  const mockItemsArray: ItemModel[] = [
    mockDataItem1,
    mockDataItem2
  ];

  const fetchResponse = {
    suscces  : true,
    result : mockItemsArray
  };

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
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('clear() should set items$ empty' , () => {
    service.clear();
    expect(service.getAll()).toEqual([]);
  });

  it('addItem() should add an item to items$' , () => {
    service.clear();

    // add the item to items$
    service.addItem(mockDataItem1);

    const test  = service.get(mockDataItem1.id);
    expect(test).toEqual(mockDataItem1);

  });

  it('get() should return the object with id ' + mockDataItem1.id , () => {
    service.clear();

    // this will be added to items$ and should be found
    service.addItem(mockDataItem1);

    // add an extra item to items$
    service.addItem(mockDataItem2);

    const test  = service.get(mockDataItem1.id);
    expect(test).toEqual(mockDataItem1);
  });

  describe('deleteItem()' , () => {

    it('deleteItem() should return true' , () => {
      service.clear();

      // add the item to items$ to be deleted
      service.addItem(mockDataItem1);

      // add an extra item to items$
      service.addItem(mockDataItem2);

      const test  = service.deleteItem(mockDataItem1.id);
      expect(test).toBeTruthy();

    });

    it('deleteItem() should remove the id from the items$ array' , () => {
      service.clear();

      // add the item to items$ to be deleted
      service.addItem(mockDataItem1);

      // add an extra item to items$
      service.addItem(mockDataItem2);

      // delete the target item
      service.deleteItem(mockDataItem1.id);

      const test  = service.get(mockDataItem1.id);
      expect(test).toBeFalsy();

    });
  });

  describe('updateItem()' , () => {

    it('updateItem() should return true' , () => {
      service.clear();

      // add the item to items$
      service.addItem(mockDataItem1);

       // create an update object
      const mockDataNew: ItemModel = {
        id: mockDataItem1.id,
        title : 'mock title update ' + mockDataItem1.id,
        description : 'mock description update ' + mockDataItem1.id
      };

      const test  = service.updateItem(mockDataItem1.id , mockDataNew);
      expect(test).toBeTruthy();

    });

    it('updateItem() should return the new updated item' , () => {
      service.clear();

      // add the item to items$
      service.addItem(mockDataItem1);

      // create an update object
      const mockDataNew: ItemModel = {
        id: mockDataItem1.id,
        title : 'mock title update ' + mockDataItem1.id,
        description : 'mock description update ' + mockDataItem1.id
      };

      // update the item
      service.updateItem(mockDataItem1.id , mockDataNew);

      // now try and find the item in items$
      const test  = service.get(mockDataItem1.id);
      expect(test).toEqual(mockDataNew);

    });
  });

  it('fetch() should add items to items$' , () => {
    service.clear();
    service.fetch().subscribe(
      (response) => {
        expect(service.getAll()).toEqual(mockItemsArray);
      }
    );

    const req = httpMock.expectOne('/api/items');
    expect(req.request.method).toBe('GET');
    req.flush(fetchResponse);

  });


});
