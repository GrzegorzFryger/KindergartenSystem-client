import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [NavbarComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ],
  exports: [NavbarComponent]
})
export class SharedModule {
}
