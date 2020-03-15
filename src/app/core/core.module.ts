import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreRoutingModule} from './core-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './auth/jwt.interceptor';
import {AuthenticationGuard} from './auth/authentication.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatCardModule,
    MatFormFieldModule,


  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
