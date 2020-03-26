import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuardianRoutingModule} from './guardian-routing.module';
import {ChildrenComponent} from './component/children/children.component';
import {GuardianComponent} from './guardian.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../shared/shared.module';
import {DialogOverviewExampleDialog, MealComponent} from './page/meal/meal.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ReceiablesComponent} from './page/receiables/receiables.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MealPriceComponent} from './page/meal/meal-price/meal-price.component';
import {MealDictionaryComponent} from './page/meal/meal-dictionary/meal-dictionary.component';
import {MatTreeModule} from '@angular/material/tree';
import {FinancesComponent} from './page/finances/finances.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {AbsenceComponent} from './page/absence/absence.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {environment} from '../../core/environment.dev';


@NgModule({
  declarations: [
    ChildrenComponent,
    GuardianComponent,
    MealComponent,
    ReceiablesComponent,
    FinancesComponent,
    DialogOverviewExampleDialog,
    MealPriceComponent,
    MealDictionaryComponent,
    AbsenceComponent
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
    MatTreeModule,
    MatPaginatorModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  exports: [
    MatInputModule,
  ],
  bootstrap: [GuardianComponent],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_DATE_LOCALE, useValue: environment.locale}
  ]
})
export class GuardianModule {
}
