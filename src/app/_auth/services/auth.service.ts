import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError, of, BehaviorSubject } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = new BehaviorSubject(false);

  onLogin  = new Subject<any>(); // deprecated
  onLogout  = new Subject<any>(); // deprecated

  private token: string  = null;
  private userData: UserModel = null;

  constructor(
    private http: HttpClient,
  ) {
    this.resolveToken();
  }

  validateTokenOnServer() {
    return this.http.get('/api/auth/validate-token')
      .pipe(
        map(data => {
            return data['user'] ? data['user'] : false;
          }
        ),
        tap((status) => { if (status) { this.userData  = status['user']; } }),
        tap((status) => { if (!status) { this.isLoggedIn.next(false); } }),
        catchError(err => {
          return of(false);
        }),
      );
  }

  resolveToken(): boolean {
    this.token = localStorage.getItem('token');
    this.isLoggedIn.next(this.token ?  true : false);
    return this.token ? true : false;
  }

  getToken(): string {
    return this.token;
  }

  hasToken(): boolean  {
    return this.getToken() ? true : false;
  }

  async logout() {
    return this.http.get('/api/auth/logout').toPromise().then(
      () => {
        // clear any current data
        this.clearData();

        // tell the rest of the application about the logout
        this.isLoggedIn.next(false);
        return true;
      },
      (err) => {
        return false;
      }
    );
  }

  async login({ username , password }): Promise<any>  {
    // clear some data
    this.clearData();

    // create the payload data for the api request
    const loginData  = {
      'username' : username,
      'password' : password
    };

    const data  = await this.http.post('/api/auth/login' , loginData).toPromise();

    // this part only gets executed when the promise is resolved
    if (data['token'] && data['user']) {

        this.setDataAfterLogin(data);
        this.isLoggedIn.next(true); // how do I unit test this?

        return data['user'];
    } else {
      return false;
    }
  }

  clearData() {
    this.userData  = null;
    this.token  = null;
    localStorage.clear();
  }

  getUserData(): UserModel {
    return this.userData;
  }

  private setDataAfterLogin(data) {
    this.token  = data['token'];

    // store some user data in the service
    this.userData  = data['user'];

    // store some data in local storage (webbrowser)
    localStorage.setItem('token' , this.token);
    localStorage.setItem('usermeta' , JSON.stringify(this.userData));
  }
}
