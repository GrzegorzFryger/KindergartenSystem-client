import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';

import {AdministratorRoutingModule} from './administrator-routing.module';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../../shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';

import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ChartsModule} from 'ng2-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {environment} from '../../core/environment.dev';
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [

  ],


  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    MatCardModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatTreeModule,
    MatPaginatorModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatExpansionModule,
    MatDividerModule,
    MatTabsModule,
    MatChipsModule,
    MatTooltipModule,
    ChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatStepperModule,
    MatRadioModule,
    MatRippleModule
  ],
  bootstrap: [],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_DATE_LOCALE, useValue: environment.locale},
    {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: {color: 'primary'}},
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: {color: 'primary'}},
    DatePipe,
    DecimalPipe,
    MatCheckboxModule
  ]
})
export class TeacherModule {
}
