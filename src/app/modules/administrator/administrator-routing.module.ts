import {AdministratorComponent} from './administrator.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CashPaymentsComponent} from './receivables/cash-payments/cash-payments.component';
import {TransactionsComponent} from './receivables/transactions/transactions.component';
import {ReceivablesComponent} from './receivables/receivables.component';
import {MealComponent} from './meal/meal.component';


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
            path: 'cash-payments',
            component: CashPaymentsComponent,
          },
          {
            path: 'transactions',
            component: TransactionsComponent,
          }
        ]
      },
      {
        path: 'meal',
        component: MealComponent,
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
