import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError, of } from 'rxjs';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  onLogin  = new Subject<any>();
  onLogout  = new Subject<any>();

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
            if (data['user']) {
              this.userData  = data['user'];
              return this.userData;
            }
            return false;
          }
        ),
        catchError(err => {
          return of(false);
        }),
      );
  }

  resolveToken() {
    this.token = localStorage.getItem('token');
  }

  getToken(): string {
    return this.token;
  }

  hasToken(): boolean | string {
    return this.token ? this.token : false;
  }

  logout() {
    this.http.get('/api/auth/logout').subscribe();

    this.clearData();
    this.onLogout.next();
  }

  async login(username: string = null , password: string = null ) {
    this.clearData();

    const loginData  = {
      'username' : username,
      'password' : password
    };

    return this.http.post('/api/auth/login' , loginData).toPromise().then(
      data => {
        if (data['token'] && data['user']) {
          this.token  = data['token'];

          localStorage.setItem('token' , this.token);
          localStorage.setItem('usermeta' , JSON.stringify(data['user']));

          this.userData  = data['user'];

          this.onLogin.next();

          return this.userData;
        }
        return false;
      },
      err => {
        return false;
      }
    );
  }

  clearData() {
    this.userData  = null;
    this.token  = null;
    localStorage.clear();
  }
}
