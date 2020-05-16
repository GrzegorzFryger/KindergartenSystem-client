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
import {ReceivablesComponent} from './page/finances/receiables/receivables.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {FinancesComponent} from './page/finances/finances.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {AbsenceComponent} from './page/absence/absence.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {environment} from '../../core/environment.dev';
import {SelectedChildService} from './component/children/selected-child.service';
import {AbsenceDialogComponent} from './page/absence/absence-dialog/absence-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {FinanceChartComponent} from './page/finances/finance-chart/finance-chart.component';
import {ChartsModule} from 'ng2-charts';
import {NavbarComponent} from './component/navbar/navbar.component';
import { MealAddFormGuardianComponent } from './page/meal/meal-add-form-guardian/meal-add-form-guardian.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PaymentDataComponent } from './page/finances/payment-data/payment-data.component';


@NgModule({
  declarations: [
    ChildrenComponent,
    GuardianComponent,
    ReceivablesComponent,
    FinancesComponent,
    MealComponent,
    DialogOverviewExampleDialog,
    AbsenceComponent,
    AbsenceDialogComponent,
    FinanceChartComponent,
    NavbarComponent,
    MealAddFormGuardianComponent,
    PaymentDataComponent
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
        MatNativeDateModule,
        MatStepperModule,

        MatExpansionModule,
        MatDividerModule,
        MatTabsModule,
        MatChipsModule,
        MatTooltipModule,
        MatSortModule,
        ChartsModule,
        MatCheckboxModule
    ],

    exports: [
        MatInputModule,
        ChildrenComponent,
    ],
  bootstrap: [GuardianComponent ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_DATE_LOCALE, useValue: environment.locale},
    SelectedChildService
  ]
})
export class GuardianModule {
}
