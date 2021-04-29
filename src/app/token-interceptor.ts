import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('login') !== -1 || req.url.indexOf('signup') !== 1) {
      return next.handle(req);
    }

    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken));
    }
    return next.handle(req);

  }

  addToken(req: HttpRequest<any>, jwtToken: any): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', jwtToken)
    });
  }

}
