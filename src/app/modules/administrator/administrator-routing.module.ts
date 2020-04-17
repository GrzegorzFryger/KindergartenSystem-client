import {AddCashPaymentComponent} from './page/receivables/add-cash-payment/add-cash-payment.component';
import {ImportComponent} from './page/receivables/import/import.component';
import {AdministratorComponent} from './administrator.component';
import {TransactionsComponent} from './page/receivables/transactions/transactions.component';
import {CashPaymentsComponent} from './page/receivables/cash-payments/cash-payments.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActuatorComponent} from './page/actuator/actuator.component';
import {MealComponent} from './page/meal/meal.component';
import {AccountsComponent} from './page/accounts/accounts.component';
import {AccountListComponent} from './page/accounts/account-list/account-list.component';
import {AccountCreateComponent} from './page/accounts/account-create/account-create.component';
import {AssignChildrenComponent} from './page/accounts/assign-children/assign-children.component';


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
        path: 'account',
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
