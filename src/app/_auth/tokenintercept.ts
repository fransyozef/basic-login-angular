import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError , EMPTY} from 'rxjs';
import { AuthService } from './services/auth.service';


 
@Injectable()
export class TokenIntercept implements HttpInterceptor {

    constructor(
        private authService: AuthService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.startsWith('/api') ) {
    
            const token    = this.authService.getToken();
            console.log(token);
            
            const headers    = {};
    
            if(token !== null) {
                headers['Authorization']    = 'Bearer ' + token;
            }
    
            const modified = request.clone(
                {
                    setHeaders: headers,
                }
            );
            return next.handle(modified);
        } else {
            return next.handle(request);
        }
    }
}