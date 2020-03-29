import {MatTableDataSource} from '@angular/material/table';
import {IncomingPaymentsService} from './../../../../data/service/receivables/incoming-payments.service';
import {SnackErrorHandlingService} from 'src/app/core/snack-error-handling/snack-error-handling.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IncomingPayment} from 'src/app/data/model/receivables/incoming-payment';
import {Observable, throwError} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserService} from 'src/app/data/service/users/user.service';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-receiables',
  templateUrl: './receiables.component.html',
  styleUrls: ['./receiables.component.scss']
})
export class ReceiablesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public dataSource: MatTableDataSource<IncomingPayment> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['contractorDetails', 'paymentType', 'title', 'transactionAmount', 'transactionDate'];
  public incomingPaymentsForAllChildren: Observable<Array<IncomingPayment>>;

  constructor(private incomingPaymentsService: IncomingPaymentsService,
              private userService: UserService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
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
    });
  }

  private setUpDataTable(incomingPayment: Array<IncomingPayment>): void {
    this.dataSource.data = incomingPayment;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę'; // TODO Change it into better solution (more global)
  }
}
