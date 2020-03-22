import { TransactionsComponent } from './receivables/transactions/transactions.component';
import { CashPaymentsComponent } from './receivables/cash-payments/cash-payments.component';
import { AdministratorComponent } from './administrator.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      {
        path: 'cashPayments',
        component: CashPaymentsComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
