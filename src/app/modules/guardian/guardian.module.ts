import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GuardianRoutingModule} from './guardian-routing.module';
import {ChildrenComponent} from './component/children/children.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {GuardianComponent} from './guardian.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';
import {DialogOverviewExampleDialog, MealComponent} from './page/meal/meal.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReceiablesComponent } from './page/receiables/receiables.component';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    ChildrenComponent,
    DashboardComponent,
    GuardianComponent,
    MealComponent,
    ReceiablesComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GuardianRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
  ],

  exports: [
    MatInputModule,
  ],
  entryComponents: [MealComponent, DialogOverviewExampleDialog],
  bootstrap: [MealComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class GuardianModule {
}
