import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GuardianService} from '../../../../data/service/users/guardian.service';
import {Observable, Subject} from 'rxjs';
import {Child} from '../../../../data/model/users/child';
import {MatSelectChange} from '@angular/material/select';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildrenComponent implements OnInit {
  private childSubject: Subject<Child>;
  private childrenList: Array<Child>;

  selected: boolean;
  children: Observable<Array<Child>>;
  child: Observable<Child>;

  constructor(private guardianService: GuardianService) {
    this.childSubject = new Subject<Child>();
    this.child = this.childSubject.asObservable();
    this.children = this.guardianService.children;
  }

  ngOnInit(): void {
    this.children.subscribe(children => {
      this.childrenList = children;
      return children;
    });
  }

  onSelectChange($event: MatSelectChange) {
    console.log(this.childrenList);
    this.selected = true;
    console.log('dsa');
    this.childSubject.next(this.childrenList[$event.value]);
  }
}
