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

import {ReceivablesComponent} from './page/receivables/receivables.component';
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
import {MealAddFormComponent} from './page/meal/meal-add-form/meal-add-form.component';


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
    ActuatorComponent,
    ServicesStatusComponent,
    HttpTraceComponent,
    ChartComponent,
    MetricsComponent,
    AdministratorNavigationMenuComponent,
    MealAddFormComponent,
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
    MatTooltipModule
  ],
  bootstrap: [],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    DatePipe
  ]
})
export class AdministratorModule {
}
