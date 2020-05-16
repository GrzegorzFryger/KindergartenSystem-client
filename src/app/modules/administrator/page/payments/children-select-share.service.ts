import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Child} from '../../../../data/model/accounts/child';

@Injectable({
  providedIn: 'root'
})
export class ChildrenSelectShareService {

  private childrenSelectSub: BehaviorSubject<Child>;
  childrenSelect: Observable<Child>;

  constructor() {
    this.childrenSelectSub = new BehaviorSubject<Child>(null);
    this.childrenSelect = this.childrenSelectSub.asObservable();
  }

  public selectChild(child: Child) {
    this.childrenSelectSub.next(child);
  }

}
