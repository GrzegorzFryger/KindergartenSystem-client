import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userCredentials = this.authenticationService.userCredentials;

    if (userCredentials) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userCredentials.token}`
        }
      });
    }

    return next.handle(request);
  }
}
