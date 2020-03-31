import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [NavbarComponent, UserComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule,
        MatCardModule
    ],
  exports: [NavbarComponent, UserComponent]
})
export class SharedModule {
}
