import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
<<<<<<< HEAD
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [NavbarComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ],
  exports: [NavbarComponent]
=======
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [NavbarComponent, UserComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [NavbarComponent, UserComponent]
>>>>>>> e8b98a2c14df437178355d5c661077c0ac5bcf75
})
export class SharedModule {
}
