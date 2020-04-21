import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Child} from '../../../../../../data/model/accounts/child';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {CashPayment} from '../../../../../../data/model/receivables/cash-payment';
import {CashPaymentsService} from '../../../../../../data/service/receivables/cash-payments.service';
import {MatDialog} from '@angular/material/dialog';
import {YesNoDialogComponent} from '../../../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';
import {YesNoDialogData} from '../../../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';

@Component({
  selector: 'app-search-cash-payment',
  templateUrl: './search-cash-payment.component.html',
  styleUrls: ['./search-cash-payment.component.scss']
})
export class SearchCashPaymentComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public childDataSource: MatTableDataSource<Child> = new MatTableDataSource();
  public cashPaymentsDataSource: MatTableDataSource<CashPayment> = new MatTableDataSource();

  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'dateOfBirth', 'isSelected'];
  public cashPaymentsColumnsToDisplay: string[] = ['transactionDate', 'contractorDetails', 'title', 'transactionAmount', 'action'];

  public childName = '';
  public childSurname = '';
  public selectedChildId = '';
  public amountOfCashPayments = 0;

  constructor(private childService: ChildService,
              private cashPaymentsService: CashPaymentsService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeTables();
  }

  public selectChild(childId: string): void {
    console.log('Selected child: ' + childId);
    this.selectedChildId = childId;
    this.findAllCashPayments();
  }


  public findChildren(): void {
    console.log('Searching for children with name/surname: ' + this.childName + '/' + this.childSurname);
    this.resetChildState();
    this.childService.searchChildrenByFullName(this.childName, this.childSurname).subscribe(
      resp => {
        console.log(resp);
        this.setChildDataToTable(resp);
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy dzieci');
        console.log(error);
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  public deleteCashPayment(cashPaymentId: number): void {
    console.log('Attempting to remove cash payment with id: ' + cashPaymentId);
    this.openRemovalDialog('Czy na pewno chcesz usunąć tę płatność?', cashPaymentId);
  }

  public editCashPayment(cashPaymentId: string): void {
    console.log('Attempting to edit cash payment with id: ' + cashPaymentId);
  }

  private openRemovalDialog(question: string, cashPaymentId: number): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed with answer: ' + result.answer);
        this.removeCashPayment(result.answer, cashPaymentId);
      }
    );
  }

  private removeCashPayment(userConfirmation: boolean, cashPaymentId: number) {
    if (userConfirmation) {
      this.cashPaymentsService.deleteCashPayment(cashPaymentId).subscribe(
        resp => {
          this.snackMessageHandlingService.success('Płatność została usunięta');
          this.filterCashPayments(cashPaymentId);
        }, error => {
          this.snackMessageHandlingService.error('Wystąpił problem z usunięciem płatności');
        },
        () => {
          // ON COMPLETE
        }
      );
    } else {
      // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
    }
  }

  private findAllCashPayments(): void {
    this.cashPaymentsService.getAllCashPaymentsForChild(this.selectedChildId).subscribe(
      resp => {
        console.log(resp);
        this.setCashPaymentsDataToTable(resp);
        this.amountOfCashPayments = resp.length;

        if (this.amountOfCashPayments <= 0) {
          this.snackMessageHandlingService.warning('Wybrane dziecko nie posiada przypisanych płatności');
        }
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy płatności gotówkowych');
      },
      () => {
        // ON COMPLETE
      }
    );
  }

  private filterCashPayments(removedCashPaymentId: number) {
    this.cashPaymentsDataSource.data = this.cashPaymentsDataSource.data.filter(
      cashPayment => {
        return cashPayment.id !== removedCashPaymentId; // Removed cash payment should not be visible in list
      }
    );
  }

  private resetChildState(): void {
    this.childDataSource.data = [];  // Remove all found children when performing new children search
    this.selectedChildId = ''; // Reset state of selected child
  }

  private setChildDataToTable(children: Array<Child>): void {
    this.childDataSource.data = children;
  }

  private setCashPaymentsDataToTable(cashPayments: Array<CashPayment>): void {
    this.cashPaymentsDataSource.data = cashPayments;
  }

  private initializeTables(): void {
    this.childDataSource.data = [];
    this.childDataSource.sort = this.sort.toArray()[0];
    this.childDataSource.paginator = this.paginator.toArray()[0];
    // TODO Change it into better solution (more global)
    this.childDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';

    this.cashPaymentsDataSource.data = [];
    this.cashPaymentsDataSource.sort = this.sort.toArray()[1];
    this.cashPaymentsDataSource.paginator = this.paginator.toArray()[1];
    // TODO Change it into better solution (more global)
    this.cashPaymentsDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
  }

}
