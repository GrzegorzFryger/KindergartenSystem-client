import {AddCashPaymentComponent} from './page/receivables/add-cash-payment/add-cash-payment.component';
import {ImportComponent} from './page/receivables/import/import.component';
import {AdministratorComponent} from './administrator.component';
import {TransactionsComponent} from './page/receivables/transactions/transactions.component';
import {CashPaymentsComponent} from './page/receivables/cash-payments/cash-payments.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReceivablesComponent} from './page/receivables/receivables.component';
import {MealComponent} from './page/meal/meal.component';
import {UsersComponent} from './page/users/users.component';
import {GuardianComponent} from './page/users/guardian/guardian.component';
import {EmployeeComponent} from './page/users/employee/employee.component';
import {ChildrenComponent} from '../guardian/component/children/children.component';


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
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: 'guardians',
            component: GuardianComponent,
          },
          {
            path: 'employee',
            component: EmployeeComponent,
          },
          {
            path: 'children',
            component: ChildrenComponent,
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
