import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Child} from '../../../../data/model/accounts/child';

@Injectable({
  providedIn: 'root'
})
export class ChildrenSelectShareService {

  private childrenSelectSub: ReplaySubject<Child>;
  public childrenSelect: Observable<Child>;

  constructor() {
    this.childrenSelectSub = new ReplaySubject<Child>();
    this.childrenSelect = this.childrenSelectSub.asObservable();
  }

  public selectChild(child: Child) {
    this.childrenSelectSub.next(child);
  }

}
