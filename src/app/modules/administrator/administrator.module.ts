import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministratorRoutingModule} from './administrator-routing.module';
import {AdministratorComponent} from './administrator.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../../shared/shared.module';
import {MealPriceComponent} from './meal/meal-price/meal-price.component';
import {DialogOverviewExampleDialog, MealComponent} from './meal/meal.component';
import {MealDictionaryComponent} from './meal/meal-dictionary/meal-dictionary.component';
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

import { ReceivablesComponent } from './page/receivables/receivables.component';
import { CashPaymentsComponent } from './page/receivables/cash-payments/cash-payments.component';
import { TransactionsComponent } from './page/receivables/transactions/transactions.component';
import { ImportComponent } from './page/receivables/import/import.component';
import { AddCashPaymentComponent } from './page/receivables/add-cash-payment/add-cash-payment.component';
import { AbsenceComponent } from './page/calendar/absence/absence.component';
import { AddAbsenceComponent } from './page/calendar/absence/add-absence/add-absence.component';
import { RemoveAbsenceComponent } from './page/calendar/absence/remove-absence/remove-absence.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DayOffWorkComponent } from './page/calendar/day-off-work/day-off-work.component';
import { RemoveDayOffComponent } from './page/calendar/day-off-work/remove-day-off/remove-day-off.component';
import { GroupsComponent } from './page/groups/groups.component';
import { AddGroupComponent } from './page/groups/add-group/add-group.component';


@NgModule({
  declarations: [
    AdministratorComponent,
    CashPaymentsComponent,
    TransactionsComponent,
    ReceivablesComponent,
    AddCashPaymentComponent,
    ImportComponent,
    MealPriceComponent,
    MealComponent,
    MealDictionaryComponent,
    DialogOverviewExampleDialog,
    AbsenceComponent,
    AddAbsenceComponent,
    RemoveAbsenceComponent,
    DayOffWorkComponent,
    RemoveDayOffComponent,
    GroupsComponent,
    AddGroupComponent
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
    ],
  bootstrap: [],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AdministratorModule {
}
