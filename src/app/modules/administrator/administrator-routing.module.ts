import {AddCashPaymentComponent} from './page/receivables/add-cash-payment/add-cash-payment.component';
import {ImportComponent} from './page/receivables/import/import.component';
import {AdministratorComponent} from './administrator.component';
import {TransactionsComponent} from './page/receivables/transactions/transactions.component';
import {CashPaymentsComponent} from './page/receivables/cash-payments/cash-payments.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActuatorComponent} from './page/actuator/actuator.component';
import {MealComponent} from './page/meal/meal.component';
import {UsersComponent} from './page/users/users.component';
import {AccountListComponent} from './page/users/account-list/account-list.component';
import {AccountCreatorComponent} from './page/users/account-creator/account-creator.component';
import {AbsenceComponent} from './page/calendar/absence/absence.component';
import {AddAbsenceComponent} from './page/calendar/absence/add-absence/add-absence.component';
import {RemoveAbsenceComponent} from './page/calendar/absence/remove-absence/remove-absence.component';
import {DayOffWorkComponent} from './page/calendar/day-off-work/day-off-work.component';
import {RemoveDayOffComponent} from './page/calendar/day-off-work/remove-day-off/remove-day-off.component';
import {GroupsComponent} from './page/groups/groups.component';
import {AddGroupComponent} from './page/groups/add-group/add-group.component';


const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
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
      },
      {
        path: 'meal',
        component: MealComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: 'list',
            component: AccountListComponent,
          },
          {
            path: 'create',
            component: AccountCreatorComponent,
          },

        ]
      },
      {
        path: 'actuator',
        component: ActuatorComponent,
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
      },
      {
        path: 'groups',
        component: GroupsComponent,
        children: [
          {
            path: 'add-group',
            component: AddGroupComponent,
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {
}
