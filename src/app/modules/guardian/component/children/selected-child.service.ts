import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Child} from '../../../../data/model/users/child';

@Injectable()
export class SelectedChildService {
  private selectedChildSub: Subject<Child>;
  selectedChild: Observable<Child>;

  constructor() {
    this.selectedChildSub = new Subject<Child>();
    this.selectedChild = this.selectedChildSub.asObservable();
  }

  changeChild(currentChild: Child) {
    this.selectedChildSub.next(currentChild);
  }

}
