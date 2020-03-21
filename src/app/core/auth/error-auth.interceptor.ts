import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../environment.dev';

@Injectable()
export class ErrorAuthInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {

      if (error.status === 401) {
        this.authenticationService.logout();
        this.router.navigate([environment.routes.signInUrl]);
      }

      const err = error.error.message || error.statusText;
      return throwError(err);
    }));
  }
}
