import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {childHeader, fadeAnimation, fadeAnimation2, refresh, showHide} from '../animation/animations';
import {Child} from '../../../../../data/model/accounts/child';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {ChildService} from '../../../../../data/service/accounts/child.service';
import {ChildrenSelectShareService} from '../service/children-select-share.service';

@Component({
  selector: 'app-payments-menager',
  templateUrl: './payments-menager.component.html',
  styleUrls: ['./payments-menager.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation, fadeAnimation2, showHide, childHeader, refresh]
})
export class PaymentsMenagerComponent implements OnInit {

  refresh = 'false';
  currentState = 'initial';
  child: Child;

  public childColumnsToDisplay: string[] = ['img', 'name', 'surname', 'pesel', 'gender', 'dateOfBirth'];
  public childrenOutput: {
    data: Observable<Array<Child>>,
    columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: Child, filter: string) => boolean,
    select: Observable<Child>
  };
  public childSelectOutput: {
    data: Observable<Child>
  };
  private childrenSub: ReplaySubject<Array<Child>>;
  private childrenColumnsSub: BehaviorSubject<Array<string>>;
  private childrenSelectSub: ReplaySubject<Child>;

  constructor(private childService: ChildService, private childrenSelectShareService: ChildrenSelectShareService) {
    this.childrenSub = new ReplaySubject<Array<Child>>();
    this.childrenColumnsSub = new BehaviorSubject(this.childColumnsToDisplay);
    this.childrenSelectSub = new ReplaySubject<Child>();

    this.childrenOutput = {
      data: this.childrenSub.asObservable(),
      columnToDisplay: this.childrenColumnsSub.asObservable(),
      filterPredicate: null,
      select: this.childrenSelectSub.asObservable()
    };

    this.childSelectOutput = {
      data: this.childrenSelectSub.asObservable()
    };

  }

  ngOnInit(): void {
    this.childService.getAllChildren().subscribe(children => {
      this.childrenSub.next(children);
    });
  }

  onSelectPaymentEvent($event: { selected: any }) {
    this.childrenColumnsSub.next(this.childColumnsToDisplay.filter(col => col !== 'dateOfBirth' && col !== 'gender' && col !== 'pesel'));
    this.childrenSelectSub.next($event.selected);
    this.child = $event.selected;
    this.childrenSelectShareService.selectChild($event.selected);

    this.currentState = 'final';
    this.refresh = 'true';
  }

  onAnimationEvent($event: any) {
    this.refresh = 'false';
  }

}
