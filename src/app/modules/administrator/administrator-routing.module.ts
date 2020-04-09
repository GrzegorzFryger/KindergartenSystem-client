import {AddCashPaymentComponent} from './page/receivables/add-cash-payment/add-cash-payment.component';
import {ImportComponent} from './page/receivables/import/import.component';
import {AdministratorComponent} from './administrator.component';
import {TransactionsComponent} from './page/receivables/transactions/transactions.component';
import {CashPaymentsComponent} from './page/receivables/cash-payments/cash-payments.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReceivablesComponent} from './page/receivables/receivables.component';
import {MealComponent} from './meal/meal.component';
import {AbsenceComponent} from './page/calendar/absence/absence.component';
import {AddAbsenceComponent} from './page/calendar/absence/add-absence/add-absence.component';
import {RemoveAbsenceComponent} from './page/calendar/absence/remove-absence/remove-absence.component';
import {DayOffWorkComponent} from './page/calendar/day-off-work/day-off-work.component';
import {RemoveDayOffComponent} from './page/calendar/day-off-work/remove-day-off/remove-day-off.component';


const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      {
        path: 'receivables',
        component: ReceivablesComponent,
        children: [
          {
            path: 'add-cash-payment',
            component: AddCashPaymentComponent,
          },
          {
            path: 'cash-payments',
            component: CashPaymentsComponent,
          },
          {
            path: 'transactions',
            component: TransactionsComponent,
          },
          {
            path: 'import',
            component: ImportComponent,
          }
        ]
      },
      {
        path: 'meal',
        component: MealComponent,
      },
      {
        path: 'absence',
        component: AbsenceComponent,
        children: [
          {
            path: 'add-absence',
            component: AddAbsenceComponent,
          },
          {
            path: 'remove-absence',
            component: RemoveAbsenceComponent,
          }
        ]
      },
      {
        path: 'dayOff',
        component: DayOffWorkComponent,
        children: [
          {
            path: 'remove-day-off',
            component: RemoveDayOffComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {
}
