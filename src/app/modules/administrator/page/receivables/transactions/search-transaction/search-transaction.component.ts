import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../../../../../data/model/receivables/transaction';
import {TransactionsService} from '../../../../../../data/service/receivables/transactions.service';
import {SnackMessageHandlingService} from '../../../../../../core/snack-message-handling/snack-message-handling.service';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {Observable, ReplaySubject} from 'rxjs';
import {Child} from '../../../../../../data/model/accounts/child';

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.scss']
})
export class SearchTransactionComponent implements OnInit {
  public childrenOutput: { children: Observable<Array<Child>>, columnToDisplay: Array<string> };
  public transactionOutput: { transactions: Observable<Array<Transaction>>, columnToDisplay: Array<string> };

  public childColumnsToDisplay: string[] = ['name', 'surname', 'pesel', 'dateOfBirth', 'isSelected'];
  public transactionColumnsToDisplay: string[] = ['transactionDate', 'contractorDetails', 'title', 'transactionAmount'];

  private childrenSub: ReplaySubject<Array<Child>>;
  private transactionSub: ReplaySubject<Array<Transaction>>;

  constructor(private transactionsService: TransactionsService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private childService: ChildService) {
    this.childrenSub = new ReplaySubject<Array<Child>>();
    this.transactionSub = new ReplaySubject<Array<Transaction>>();

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

  onSelectChildEvent(event: { selected: string }) {
    this.transactionsService.getAllTransactionsForChild(event.selected).subscribe(
      resp => {
        this.transactionSub.next(resp);

        if (resp.length === 0) {
          this.snackMessageHandlingService.warning('Wybrane dziecko nie posiada przypisanych płatności');
        }
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z pobraniem listy płatności gotówkowych');
      }
    );

  }
}
