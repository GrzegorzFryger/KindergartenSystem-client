import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule {
}
