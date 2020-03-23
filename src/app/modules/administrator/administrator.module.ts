import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministratorRoutingModule} from './administrator-routing.module';
import {AdministratorComponent} from './administrator.component';
import {MatCardModule} from '@angular/material/card';
import {CashPaymentsComponent} from './receivables/cash-payments/cash-payments.component';
import {TransactionsComponent} from './receivables/transactions/transactions.component';
import {SharedModule} from '../../shared/shared.module';
import {ReceivablesComponent} from './receivables/receivables.component';


@NgModule({
  declarations: [AdministratorComponent, CashPaymentsComponent, TransactionsComponent, ReceivablesComponent],
    imports: [
        CommonModule,
        AdministratorRoutingModule,
        MatCardModule,
        SharedModule
    ]
})
export class AdministratorModule { }
