import {MatTableDataSource} from '@angular/material/table';
import {IncomingPaymentsService} from '../../../../../data/service/receivables/incoming-payments.service';
import {SnackErrorHandlingService} from 'src/app/core/snack-error-handling/snack-error-handling.service';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IncomingPayment} from 'src/app/data/model/receivables/incoming-payment';
import {throwError, zip} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {catchError} from 'rxjs/operators';
import {AccountService} from '../../../../../data/service/users/account.service';
import {TransactionMapping} from '../../../../../data/model/receivables/transaction-mapping';
import {Child} from '../../../../../data/model/users/child';
import {Account} from '../../../../../data/model/users/account';
import {GuardianService} from '../../../../../data/service/users/guardian.service';
import {TransactionMappingService} from '../../../../../data/service/receivables/transaction-mapping.service';

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
              private snackErrorHandlingService: SnackErrorHandlingService,
              private guardianService: GuardianService,
              private transactionMappingService: TransactionMappingService) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.incomingPaymentsService.getAllIncomingPaymentsForGuardian(user.id).subscribe(resp => {
        this.setUpDataTable(resp);
      },
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar('Failed to find user');
        return throwError(err);
      }));

      this.forkResources(user);

    });
  }

  private forkResources(u: Account) {
    zip(
      this.transactionMappingService.getAllPaymentMappingsForGuardian(u.id),
      this.guardianService.children
    ).subscribe(([transaction, children]) => {
      this.transactionMappings = transaction;
      this.children = children;
    });
  }

  private setUpDataTable(incomingPayment: Array<IncomingPayment>): void {
    this.dataSource.data = incomingPayment;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę'; // TODO Change it into better solution (more global)
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectChild(child: Child) {
    this.dataSource.filter = this.transactionMappings.find(trnas => trnas.childId === child.id).title;
  }

  clear() {
    this.dataSource.filter = '';
  }
}
