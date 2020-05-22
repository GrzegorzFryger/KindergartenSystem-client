
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GuardianService} from '../../../../data/service/accounts/guardian.service';
import {Observable} from 'rxjs';
import {Child} from '../../../../data/model/accounts/child';
import {MatSelectChange} from '@angular/material/select';
import {SelectedChildService} from './selected-child.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildrenComponent implements OnInit {
  selected: boolean;
  children: Observable<Array<Child>>;
  selectedChild: Child;

  constructor(private guardianService: GuardianService, private selectedChildService: SelectedChildService) {
    this.children = this.guardianService.children;
  }

  ngOnInit(): void {
  }

  onSelectChange(event: MatSelectChange) {
    this.selected = true;
    this.selectedChild = event.value;
    this.selectedChildService.changeChild(event.value);
  }
}
