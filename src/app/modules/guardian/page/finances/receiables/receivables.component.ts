import {MatTableDataSource} from '@angular/material/table';
import {IncomingPaymentsService} from '../../../../../data/service/receivables/incoming-payments.service';
import {SnackMessageHandlingService} from 'src/app/core/snack-message-handling/snack-message-handling.service';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IncomingPayment} from 'src/app/data/model/receivables/incoming-payment';
import {throwError} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {catchError, map} from 'rxjs/operators';
import {AccountService} from '../../../../../data/service/accounts/account.service';
import {TransactionMapping} from '../../../../../data/model/receivables/transaction-mapping';
import {Child} from '../../../../../data/model/accounts/child';
import {Account} from '../../../../../data/model/accounts/account';
import {GuardianService} from '../../../../../data/service/accounts/guardian.service';
import {TransactionMappingService} from '../../../../../data/service/receivables/transaction-mapping.service';

const ERROR_MESSAGE = 'Receivables component failed to perform operation';

@Component({
  selector: 'app-receiables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReceivablesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public transactionMappings: Array<TransactionMapping>;
  public children: Array<Child>;

  public dataSource: MatTableDataSource<IncomingPayment> = new MatTableDataSource();
  public columnsToDisplay: string[] = ['contractorDetails', 'paymentType', 'title', 'transactionAmount', 'transactionDate'];

  constructor(private incomingPaymentsService: IncomingPaymentsService,
              private userService: AccountService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private guardianService: GuardianService,
              private transactionMappingService: TransactionMappingService) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.incomingPaymentsService.getAllIncomingPaymentsForGuardian(user.id).subscribe(resp => {
          this.setUpDataTable(resp);
        },
        catchError(err => {
          this.snackMessageHandlingService.error('Wystąpił problem z załadowaniem przelewów');
          return throwError(err);
        }));

      this.guardianService.findAllGuardianChildren(user.id).subscribe(children => {
        this.initializeTransactionMappings(user).subscribe(tras => {
          this.transactionMappings = tras;
          this.children = children;
        });
      });

    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectChild(child: Child) {
    this.dataSource.filter = this.transactionMappings.find(trnas => trnas.childId === child.id).title;
  }

  clear() {
    this.dataSource.filter = '';
  }

  private setUpDataTable(incomingPayment: Array<IncomingPayment>): void {
    this.dataSource.data = incomingPayment;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę'; // TODO Change it into better solution (more global)
  }

  private initializeTransactionMappings(u: Account) {
    return this.transactionMappingService
      .getAllPaymentMappingsForGuardian(u.id)
      .pipe(
        catchError(err => {
          this.snackMessageHandlingService.error(ERROR_MESSAGE);
          return throwError(err);
        }),
        map(response => {
          return response;
        })
      );
  }

}
