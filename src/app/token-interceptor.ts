import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth/shared/auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken))
        .pipe(
          catchError(error => {
            this.authService.clearStorage();
            this.router.navigateByUrl('/login');
            return throwError(error);
          })
        );
    }
    return next.handle(req);
  }

  addToken(req: HttpRequest<any>, jwtToken: any): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', jwtToken)
    });
  }

}
