import {ImportComponent} from './page/receivables/transactions/import/import.component';
import {AdministratorComponent} from './administrator.component';
import {AssignTransactionsComponent} from './page/receivables/transactions/assign-transactions/assign-transactions.component';
import {CashPaymentsComponent} from './page/receivables/cash-payments/cash-payments.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActuatorComponent} from './page/actuator/actuator.component';
import {MealComponent} from './page/meal/meal.component';
import {AccountsComponent} from './page/accounts/accounts.component';
import {AccountListComponent} from './page/accounts/account-list/account-list.component';
import {AccountCreateComponent} from './page/accounts/account-create/account-create.component';
import {AssignChildrenComponent} from './page/accounts/assign-children/assign-children.component';
import {AddCashPaymentComponent} from './page/receivables/cash-payments/add-cash-payment/add-cash-payment.component';
import {SearchCashPaymentComponent} from './page/receivables/cash-payments/search-cash-payment/search-cash-payment.component';
import {TransactionsComponent} from './page/receivables/transactions/transactions.component';
import {SearchTransactionComponent} from './page/receivables/transactions/search-transaction/search-transaction.component';
import {DayOffWorkComponent} from './page/calendar/day-off-work/day-off-work.component';
import {AbsenceComponent} from './page/calendar/absence/absence.component';
import {MealOrderComponent} from './page/meal/meal-order/meal-order.component';
import {GroupsComponent} from './page/groups/groups.component';
import {PaymentsComponent} from './page/payments/payments.component';
import {ChildrenPaymentsComponent} from './page/payments/manger-payments/children-payments/children-payments.component';
import {HistoryPaymentsComponent} from './page/payments/manger-payments/history-payments/history-payments.component';
import {DiscountPaymentsComponent} from './page/payments/discount-payments/discount-payments.component';
import {MangerPaymentsComponent} from './page/payments/manger-payments/manger-payments.component';
import {CheckAbsenceComponent} from './page/calendar/check-absence/check-absence.component';
import {UserEditComponent} from '../../shared/user/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      {
        path: 'cash-payments',
        component: CashPaymentsComponent,
        children: [
          {
            path: 'add',
            component: AddCashPaymentComponent,
          },
          {
            path: 'search',
            component: SearchCashPaymentComponent,
          }
        ]
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        children: [
          {
            path: 'assign',
            component: AssignTransactionsComponent,
          },
          {
            path: 'import',
            component: ImportComponent,
          },
          {
            path: 'search',
            component: SearchTransactionComponent,
          },
        ]
      },
      {
        path: 'meal',
        component: MealComponent,
      },
      {
        path: 'order',
        component: MealOrderComponent,
      },
      {
        path: 'dayOff',
        component: DayOffWorkComponent,
      },
      {
        path: 'absence',
        component: AbsenceComponent,
      },
      {
        path: 'check-absence',
        component: CheckAbsenceComponent,
      },
      {
        path: 'groups',
        component: GroupsComponent,
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        children: [
          {
            path: 'list',
            component: AccountListComponent,
          },
          {
            path: 'create',
            component: AccountCreateComponent,
          },
          {
            path: 'assign-children',
            component: AssignChildrenComponent,
          },
        ]
      },
      {
        path: 'actuator',
        component: ActuatorComponent,
      },
      {
        path: 'payments-main',
        component: PaymentsComponent,
        children: [
          {
            path: 'payments',
            component: MangerPaymentsComponent,
            children: [
              {
                path: 'list',
                component: ChildrenPaymentsComponent
              },
              {
                path: 'history',
                component: HistoryPaymentsComponent
              }
            ]
          },
          {
            path: 'discount',
            component: DiscountPaymentsComponent
          },
        ]
      },
      {
        path: 'user-edit',
        component: UserEditComponent
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
