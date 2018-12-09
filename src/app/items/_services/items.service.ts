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

  // deprecated
  fetchCount$ = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
  ) { }

  clear(): void {
    this.items$.next([]);
  }

  get(id: number): ItemModel {
    const currentItems: ItemModel[]  = this.items$.getValue();
    if (currentItems.length === 0) {
      return null;
    }

    const index1  = currentItems.findIndex((element) => {
      return element.id === id;
    });
    return (index1 >= 0 && currentItems[index1]) ? currentItems[index1] : null;
  }

  delete(id: number): Observable<any> {
    return this.http.delete('/api/item/' + id)
      .pipe(
        map(data => {
            return (data['success'] && data['success'] === true) ? true : false;
          }
        ),
        tap((success) => { this.deleteItem(id); }),
        catchError((err) => {
          return of(false);
        }),
      );
  }

  fetchItem(id: number): Observable<any> {
    return this.http.get('/api/item/' + id)
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
    return this.http.put('/api/item/' + id , payload)
      .pipe(
        map(responseData => {
            return (responseData['success'] && responseData['success'] === true) ? responseData['result'] : false;
          }
        ),
        tap(item => { this.updateItem(id , item); }),
        catchError(err => {
          return of(false);
        }),
      );
  }

  add(payload: AddItemModel): Observable<any> {
    return this.http.post('/api/item' , payload)
      .pipe(
        map(responseData => {
            return (responseData['success'] && responseData['success'] === true) ? responseData['result'] : false;
          }
        ),
        tap(item => { this.addItem(item); }),
        catchError(err => {
          return of(false);
        }),
      );
  }

  deleteItem(id: number): boolean  {
    const currentItems: ItemModel[]  = this.items$.getValue();
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
    const currentItems: ItemModel[]  = this.items$.getValue();
    currentItems.push(item);
    this.items$.next(currentItems);
  }

  updateItem(id: number , item: ItemModel): boolean {
    const currentItems: ItemModel[]  = this.items$.getValue();
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

  // deprecated
  setFetchCount(count: number) {
    this.fetchCount$.next(count);
  }

  // deprecated
  increaseFetchCount() {
    this.fetchCount$.next(this.fetchCount$.getValue() + 1);
  }

  fetch(): Observable<any> {

    this.clear();

    return this.http.get('/api/items')
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
