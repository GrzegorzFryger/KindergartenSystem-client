import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Child} from '../../../../../../data/model/accounts/child';
import {Transaction} from '../../../../../../data/model/receivables/transaction';
import {CashPayment} from '../../../../../../data/model/receivables/cash-payment';
import {TransactionsService} from '../../../../../../data/service/receivables/transactions.service';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {ChildService} from '../../../../../../data/service/accounts/child.service';

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.scss']
})
export class SearchTransactionComponent implements OnInit, AfterViewInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public childDataSource: MatTableDataSource<Child> = new MatTableDataSource();
  public transactionDataSource: MatTableDataSource<Transaction> = new MatTableDataSource();

  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'dateOfBirth', 'isSelected'];
  public transactionColumnsToDisplay: string[] = ['transactionDate', 'contractorDetails', 'title', 'transactionAmount'];

  public childName = '';
  public childSurname = '';
  public selectedChildId = '';
  public amountOfTransactions = 0;

  constructor(private transactionsService: TransactionsService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private childService: ChildService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeTables();
  }

  public selectChild(childId: string): void {
    console.log('Selected child: ' + childId);
    this.selectedChildId = childId;
    this.findAllTransactions();
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

  private findAllTransactions(): void {
    this.transactionsService.getAllTransactionsForChild(this.selectedChildId).subscribe(
      resp => {
        console.log(resp);
        this.setTransactionDataToTable(resp);
        this.amountOfTransactions = resp.length;

        if (this.amountOfTransactions <= 0) {
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

  private resetChildState(): void {
    this.childDataSource.data = [];  // Remove all found children when performing new children search
    this.selectedChildId = ''; // Reset state of selected child
  }

  private setChildDataToTable(children: Array<Child>): void {
    this.childDataSource.data = children;
  }

  private setTransactionDataToTable(transactions: Array<Transaction>): void {
    this.transactionDataSource.data = transactions;
  }

  private initializeTables(): void {
    this.childDataSource.data = [];
    this.childDataSource.sort = this.sort.toArray()[0];
    this.childDataSource.paginator = this.paginator.toArray()[0];
    // TODO Change it into better solution (more global)
    this.childDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';

    this.transactionDataSource.data = [];
    this.transactionDataSource.sort = this.sort.toArray()[1];
    this.transactionDataSource.paginator = this.paginator.toArray()[1];
    // TODO Change it into better solution (more global)
    this.transactionDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
  }

}
