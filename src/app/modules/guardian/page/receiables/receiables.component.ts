import { MatTableDataSource } from '@angular/material/table';
import { IncomingPaymentsService } from './../../../../data/service/receivables/incoming-payments.service';
import { SnackErrorHandlingService } from 'src/app/core/snack-error-handling/snack-error-handling.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IncomingPayment } from 'src/app/data/model/receivables/incoming-payment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/data/service/users/user.service';
import { User } from 'src/app/data/model/users/user';

const ERROR_MESSAGE = 'error';

@Component({
  selector: 'app-receiables',
  templateUrl: './receiables.component.html',
  styleUrls: ['./receiables.component.scss']
})
export class ReceiablesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public dataSource: MatTableDataSource<IncomingPayment> = new MatTableDataSource();
  public columnsToDisplay: string[] = ['contractorDetails', 'paymentType', 'title', 'transactionAmount', 'transactionDate'];
  public incomingPaymentsForAllChildren: Observable<Array<IncomingPayment>>;

  constructor(private incomingPaymentsService: IncomingPaymentsService,
              private userService: UserService,
              private snackErrorHandlingService: SnackErrorHandlingService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(u => {
      this.getIncomingPayments(u);
    });
    this.initializeDataSorting();
  }

  ngAfterViewInit(): void {
    this.initializeData();
    this.initializePaginator();
  }

  private getIncomingPayments(u: User) {
    this.incomingPaymentsForAllChildren = this.incomingPaymentsService
    .getAllIncomingPaymentsForGuardian(u.id)
    .pipe(
      catchError(err => {
        this.snackErrorHandlingService.openSnackBar(ERROR_MESSAGE);
        return throwError(err);
      }),
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

  private initializeDataSorting(): void {
    this.dataSource.sort = this.sort;
  }

  private initializeData(): void {
    this.incomingPaymentsForAllChildren.subscribe(
      payments => {
        this.dataSource.data = payments;
      }
    );
  }

  private initializePaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę'; // TODO Change it into better solution (more global)
  }

}
