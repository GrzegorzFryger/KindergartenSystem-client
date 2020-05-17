import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreRoutingModule} from './core-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './auth/jwt.interceptor';
import {AuthenticationGuard} from './auth/authentication.guard';
import {ErrorAuthInterceptor} from './auth/error-auth.interceptor';
import {ErrorComponent} from './snack-message-handling/error/error.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {InfoComponent} from './snack-message-handling/info/info.component';
import {SuccessComponent} from './snack-message-handling/success/success.component';
import {WarningComponent} from './snack-message-handling/warning/warning.component';
import {MatIconModule} from '@angular/material/icon';
import {YesNoDialogComponent} from './dialog/yes-no-dialog/yes-no-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ErrorComponent, InfoComponent, SuccessComponent, WarningComponent, YesNoDialogComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
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
