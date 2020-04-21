import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Child} from '../../../../../../data/model/accounts/child';
import {Transaction} from '../../../../../../data/model/receivables/transaction';
import {TransactionsService} from '../../../../../../data/service/receivables/transactions.service';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.scss']
})
export class SearchTransactionComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public childrenOutput: { children: Observable<Array<Child>>, columnToDisplay: Array<string> };
  public transactionOutput: { transactions: Observable<Array<Transaction>>, columnToDisplay: Array<string> };
  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'dateOfBirth', 'isSelected'];
  public transactionColumnsToDisplay: string[] = ['transactionDate', 'contractorDetails', 'title', 'transactionAmount'];
  public selectedChildId = '';
  public amountOfTransactions = 0;

  private childrenSub: Subject<Array<Child>>;
  private transactionSub: Subject<Array<Transaction>>;

  constructor(private transactionsService: TransactionsService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private childService: ChildService) {
    this.childrenSub = new Subject<Array<Child>>();
    this.transactionSub = new Subject<Array<Transaction>>();
    this.childrenOutput = {children: this.childrenSub.asObservable(), columnToDisplay: this.childColumnsToDisplay};
    this.transactionOutput = {transactions: this.transactionSub.asObservable(), columnToDisplay: this.transactionColumnsToDisplay};
  }

  ngOnInit(): void {
    this.childService.getAllChildren().subscribe(chil => {
      this.childrenSub.next(chil);
    }, error => {
      this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy dzieci');
      console.log(error);
    });
  }

  private findAllTransactions(): void {
    this.transactionsService.getAllTransactionsForChild(this.selectedChildId).subscribe(
      resp => {
        console.log(resp);
        this.transactionSub.next(resp);
        this.amountOfTransactions = resp.length;

        if (this.amountOfTransactions <= 0) {
          this.snackMessageHandlingService.warning('Wybrane dziecko nie posiada przypisanych płatności');
        }
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy płatności gotówkowych');
      }
    );
  }

  onSelectChildEvent(event: { selected: string }) {
    this.selectedChildId = event.selected;
    this.findAllTransactions();
  }
}
