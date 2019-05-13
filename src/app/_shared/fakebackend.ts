import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError , EMPTY} from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private fullName: String    = 'John Doe';
    private email: String    = 'john@doe.com';

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(null).pipe(mergeMap(() => {

            const auth    = request.headers.get('Authorization');

            // Items list
            if (request.url.endsWith(environment['apiBaseUrl'] + '/api/items') && request.method === 'GET') {

                console.log('[ intercepting ] ' + request.method + ' : ' + request.url + ' ' + auth);

                const body = {
                    result : [
                        {
                            title : 'Item 1',
                            description : 'Description 1',
                            id : 1
                        },
                        {
                            title : 'Item 2',
                            description : 'Description 2',
                            id : 2
                        },
                        // {
                        //     title : 'Item 2',
                        //     description : 'Description 2',
                        //     id : 3
                        // },
                        // {
                        //     title : 'Item 2',
                        //     description : 'Description 2',
                        //     id : 4
                        // },
                        // {
                        //     title : 'Item 2',
                        //     description : 'Description 2',
                        //     id : 5
                        // },
                        // {
                        //     title : 'Item 2',
                        //     description : 'Description 2',
                        //     id : 6
                        // },
                        // {
                        //     title : 'Item 2',
                        //     description : 'Description 2',
                        //     id : 7
                        // }
                    ]
                };
                return of(new HttpResponse({ status: 200, body: body }));
            }

            // Add item
            if (request.url.endsWith(environment['apiBaseUrl'] + '/api/item') && request.method === 'POST') {

                console.log('[ intercepting ] ' + request.method + ' : ' + request.url + ' ' + auth);

                const bodyPosted    = request.body;
                const random    = (Math.floor(Math.random() * Math.floor(1000)) + 1);
                const newResult    = { ...bodyPosted , id: random};

                const body = {
                    success : bodyPosted ? true : false,
                    result : newResult
                };
                return of(new HttpResponse({ status: 200, body: body }));
            }

            // Update item
            if (request.url.startsWith(environment['apiBaseUrl'] + '/api/item') && request.method === 'PUT') {

                console.log('[ intercepting ] ' + request.method + ' : ' + request.url + ' ' + auth);

                const bodyPosted    = request.body;

                const body = {
                    success : bodyPosted ? true : false,
                    result : bodyPosted
                };
                return of(new HttpResponse({ status: 200, body: body }));
            }

            // Delete item
            if (request.url.startsWith(environment['apiBaseUrl'] + '/api/item/') && request.method === 'DELETE') {
                console.log('[ intercepting ] ' + request.method + ' : ' + request.url + ' ' + auth);
                const body = {
                    success : true
                };
                return of(new HttpResponse({ status: 200, body: body }));
            }


            // LOGIN
            if (request.url.endsWith(environment['apiBaseUrl'] + '/api/auth/login') && request.method === 'POST') {

                console.log('[ intercepting ] ' + request.method + ' : ' + request.url + ' ' + auth);

                const random    = (Math.floor(Math.random() * Math.floor(40)) % 4);
                const bodyPosted    = request.body;
                let body    = {};

                // simulating a valid/invalid login
                if (random !== 0) {
                    body = {
                        token : 'token_' + this.makeid(),
                        user : {
                            fullname : this.fullName,
                            email : this.email,
                            username : bodyPosted['username'],
                        }
                    };
                }

                return of(new HttpResponse({ status: 200, body: body }));
            }

            // LOGOUT
            if (request.url.endsWith(environment['apiBaseUrl'] + '/api/auth/logout') && request.method === 'GET') {
                console.log('[ intercepting ] ' + request.method + ' : ' + request.url + ' ' + auth);
                const body = {
                  success : true
                };
                return of(new HttpResponse({ status: 200, body: body }));
            }

            // VALIDATE TOKEN
            if (request.url.endsWith(environment['apiBaseUrl'] + '/api/auth/validate-token') && request.method === 'GET') {
                console.log('[ intercepting ] ' + request.method + ' : ' + request.url + ' ' + auth);
                const body = {
                    user : {
                        fullname : this.fullName,
                        email : this.email,
                        username : this.email,
                    }
                };
                return of(new HttpResponse({ status: 200, body: body }));
            }

            // at default just process the request
            return next.handle(request);
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }

    private makeid(): string {
        let  text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 25; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
