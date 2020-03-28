import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdministratorRoutingModule} from './administrator-routing.module';
import {AdministratorComponent} from './administrator.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../../shared/shared.module';
import {ReceivablesComponent} from './page/receivables/receivables.component';
import { CashPaymentsComponent } from './page/receivables/cash-payments/cash-payments.component';
import { TransactionsComponent } from './page/receivables/transactions/transactions.component';
import { ImportComponent } from './page/receivables/import/import.component';
import { AddCashPaymentComponent } from './page/receivables/add-cash-payment/add-cash-payment.component';


@NgModule({
  declarations: [AdministratorComponent, CashPaymentsComponent, TransactionsComponent,
    ReceivablesComponent, ImportComponent, AddCashPaymentComponent],
    imports: [
        CommonModule,
        AdministratorRoutingModule,
        MatCardModule,
        SharedModule
    ]
})
export class AdministratorModule { }
