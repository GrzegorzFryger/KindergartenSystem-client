import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {AdministratorRoutingModule} from './administrator-routing.module';
import {AdministratorComponent} from './administrator.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../../shared/shared.module';
import {MealPriceComponent} from './page/meal/meal-price/meal-price.component';
import {DialogOverviewExampleDialog, MealComponent} from './page/meal/meal.component';
import {MealDictionaryComponent} from './page/meal/meal-dictionary/meal-dictionary.component';
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

import {CashPaymentsComponent} from './page/receivables/cash-payments/cash-payments.component';
import {TransactionsComponent} from './page/receivables/transactions/transactions.component';
import {ImportComponent} from './page/receivables/import/import.component';
import {AddCashPaymentComponent} from './page/receivables/add-cash-payment/add-cash-payment.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ActuatorComponent} from './page/actuator/actuator.component';
import {ServicesStatusComponent} from './page/actuator/services-status/services-status.component';
import {HttpTraceComponent} from './page/actuator/http-trace/http-trace.component';
import {ChartComponent} from './page/actuator/chart/chart.component';
import {MetricsComponent} from './page/actuator/metrics/metrics.component';
import {AdministratorNavigationMenuComponent} from './component/administrator-navigation-menu/administrator-navigation-menu.component';
import {UsersComponent} from './page/users/users.component';
import {ProfileComponent} from './page/users/account-list/profiles/person-profile/profile.component';
import {GuardianComponent} from './page/users/account-list/guardian/guardian.component';
import {EmployeeComponent} from './page/users/account-list/employee/employee.component';
import {ChildComponent} from './page/users/account-list/child/child.component';
import {PersonFormComponent} from './page/users/forms/person-form/person-form.component';
import {AccountCreatorComponent} from './page/users/account-creator/account-creator.component';
import {AccountListComponent} from './page/users/account-list/account-list.component';
import {UserChartComponent} from './page/users/user-chart/user-chart.component';
import {ChartsModule} from 'ng2-charts';
import {ChildProfileComponent} from './page/users/account-list/profiles/child-profile/child-profile.component';
import {ChildFormComponent} from './page/users/forms/child-form/child-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {environment} from '../../core/environment.dev';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AdministratorComponent,
    CashPaymentsComponent,
    TransactionsComponent,
    AddCashPaymentComponent,
    ImportComponent,
    MealPriceComponent,
    MealComponent,
    MealDictionaryComponent,
    DialogOverviewExampleDialog,
    AdministratorNavigationMenuComponent,
    UsersComponent,
    ProfileComponent,
    GuardianComponent,
    EmployeeComponent,
    ChildComponent,
    PersonFormComponent,
    AccountCreatorComponent,
    AccountListComponent,
    UserChartComponent,
    ChildProfileComponent,
    ChildFormComponent,
    ActuatorComponent,
    ServicesStatusComponent,
    HttpTraceComponent,
    ChartComponent,
    MetricsComponent,
    AdministratorNavigationMenuComponent
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
    MatRadioModule
  ],
  bootstrap: [],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {provide: MAT_DATE_LOCALE, useValue: environment.locale},
    {provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' }},
    DatePipe,
    MatCheckboxModule
  ]
})
export class AdministratorModule {
}
