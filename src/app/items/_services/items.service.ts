import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject,throwError, of , BehaviorSubject} from 'rxjs';
import { map,mergeMap,switchMap ,catchError , tap} from 'rxjs/operators';

import { ItemModel } from '../_models/item.model';
import { AddItemModel } from '../_models/add-item.model';
import { UpdateItemModel } from '../_models/update-item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  // create a BehaviourSubject Observable with type ItemModel[] and default value []
  items$ = new BehaviorSubject<ItemModel[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  clear(): void {
    this.items$.next([]);
  }

  getAll(): ItemModel[] {
    return this.items$.getValue();
  }

  get(id: number): ItemModel {
    const currentItems: ItemModel[]  = this.getAll();
    if (currentItems.length === 0) {
      return null;
    }

    const index1  = currentItems.findIndex((element) => {
      return element.id === id;
    });
    return (index1 >= 0 && currentItems[index1]) ? currentItems[index1] : null;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment['apiBaseUrl'] + '/api/item/' + id)
      .pipe(
        map(data => {
            return (data['success'] && data['success'] === true) ? true : false;
          }
        ),
        tap((success) => { if (success) { this.deleteItem(id); }}), // when success, delete the item from the local service
        catchError((err) => {
          return of(false);
        }),
      );
  }

  fetchItem(id: number): Observable<any> {
    return this.http.get(environment['apiBaseUrl'] + '/api/item/' + id)
      .pipe(
        map(data => {
            return (data['success'] && data['success'] === true) ? data['result'] : false;
          }
        ),
        catchError((err) => {
          return of(false);
        }),
      );
  }

  update(id: number , payload: UpdateItemModel): Observable<any> {
    return this.http.put(environment['apiBaseUrl'] + '/api/item/' + id , payload)
      .pipe(
        map(responseData => {
            return (responseData['success'] && responseData['success'] === true) ? responseData['result'] : false;
          }
        ),
        tap(item => { if (item) { this.updateItem(id , item); }}), // when success result, update the item in the local service
        catchError(err => {
          return of(false);
        }),
      );
  }

  add(payload: AddItemModel): Observable<any> {
    return this.http.post(environment['apiBaseUrl'] + '/api/item' , payload)
      .pipe(
        map(responseData => {
            return (responseData['success'] && responseData['success'] === true) ? responseData['result'] : false;
          }
        ),
        tap(item => { if (item) { this.addItem(item); }}), // when success, add the item to the local service
        catchError(err => {
          return of(false);
        }),
      );
  }

  deleteItem(id: number): boolean  {
    const currentItems: ItemModel[]  = this.getAll();
    if (currentItems.length > 0) {
      const index1  = currentItems.findIndex((element) => {
        return element.id === id;
      });
      if (index1 >= 0 ) {
        currentItems.splice(index1, 1);
        this.items$.next(currentItems);
        return true;
      }
    }
    return false;
  }

  addItem(item: ItemModel): void {
    const currentItems: ItemModel[]  = this.getAll();
    currentItems.push(item);
    this.items$.next(currentItems);
  }

  updateItem(id: number , item: ItemModel): boolean {
    const currentItems: ItemModel[]  = this.getAll();
    if (currentItems.length > 0) {
      const index1  = currentItems.findIndex((element) => {
        return element.id === id;
      });
      if (index1 >= 0 ) {
        currentItems[index1] = item;
        this.items$.next(currentItems);
        return true;
      }
    }
    return false;
  }

  fetch(): Observable<any> {

    this.clear();

    return this.http.get(environment['apiBaseUrl'] + '/api/items')
      .pipe(
        map(data => {
            return (data['result']) ? data['result'] : false;
          }
        ),
        tap((items) => { if (items) { this.items$.next(items); }}),
        catchError(err => {
          return of(false);
        }),
      );
  }

}
