import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreRoutingModule} from './core-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './auth/jwt.interceptor';
import {AuthenticationGuard} from './auth/authentication.guard';
import {ErrorAuthInterceptor} from './auth/error-auth.interceptor';
import {SnackErrorHandlingComponent} from './snack-error-handling/snack-error-handling.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [SnackErrorHandlingComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorAuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
