import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError , EMPTY} from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    private makeid(): string {
        let  text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 25; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(null).pipe(mergeMap(() => {

            const auth    = request.headers.get('Authorization');

            // LOGIN
            if (request.url.endsWith('/api/auth/login') && request.method === 'POST') {
                console.log('intercepting ' + request.method + ' : ' + request.url + ' ' + auth);

                const bodyPosted    = request.body;

                const body = {

                    token : 'token_' + this.makeid(),
                    user : {
                        fullname : 'Jane Doe',
                        email : 'Jane@doe.com',
                        username : bodyPosted['username'],
                    }

                };
                return of(new HttpResponse({ status: 200, body: body }));
            }

            // LOGOUT
            if (request.url.endsWith('/api/auth/logout') && request.method === 'GET') {
                console.log('intercepting ' + request.method + ' : ' + request.url + ' ' + auth);
                const body = {
                  success : true
                };
                // return a response
                return of(new HttpResponse({ status: 200, body: body }));
            }

            // VALIDATE TOKEN
            if (request.url.endsWith('/api/auth/validate-token') && request.method === 'GET') {
                const body = {
                    user : {
                        fullname : 'Jane Doe',
                        email : 'Jane@doe.com',
                        username : 'Jane@doe.com',
                    }
                };
                // return a response
                return of(new HttpResponse({ status: 200, body: body }));
            }




            // at default just process the request
            return next.handle(request);
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
        
    }
}