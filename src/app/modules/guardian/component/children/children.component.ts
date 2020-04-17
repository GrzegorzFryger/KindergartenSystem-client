import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GuardianService} from '../../../../data/service/users/guardian.service';
import {Observable, Subject} from 'rxjs';
import {Child} from '../../../../data/model/users/child';
import {MatSelectChange} from '@angular/material/select';
import {map} from 'rxjs/operators';
import {SelectedChildService} from './selected-child.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildrenComponent implements OnInit {
  private childrenList: Array<Child>;

  selected: boolean;
  children: Observable<Array<Child>>;
  selectedChild: Child;

  constructor(private guardianService: GuardianService, private selectedChildService: SelectedChildService) {
    this.children = this.guardianService.children;
  }

  ngOnInit(): void {
    this.children.subscribe(children => {
      this.childrenList = children;
      return children;
    });
  }

  onSelectChange($event: MatSelectChange) {
    this.selected = true;
    this.selectedChild = this.childrenList[$event.value];
    this.selectedChildService.changeChild(this.selectedChild);
  }
}
