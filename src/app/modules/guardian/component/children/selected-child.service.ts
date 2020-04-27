import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Child} from '../../../../data/model/accounts/child';

@Injectable()
export class SelectedChildService {
  private selectedChildSub: Subject<Child>;
  selectedChild: Observable<Child>;

  constructor() {
    this.selectedChildSub = new ReplaySubject<Child>();
    this.selectedChild = this.selectedChildSub.asObservable();
  }

  changeChild(currentChild: Child) {
    this.selectedChildSub.next(currentChild);
  }

}
