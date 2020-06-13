import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GuardianService} from '../../../../data/service/accounts/guardian.service';
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
  children: Array<Child>;
  selectedChild: Child;

  constructor(private guardianService: GuardianService, private selectedChildService: SelectedChildService) {
  }

  ngOnInit(): void {
    this.guardianService.children.subscribe(children => {
      this.children = children;
      this.selectedChild = children[0];
      this.selected = true;
      this.selectedChildService.changeChild(children[0]);
    });
  }

  onSelectChange(event: MatSelectChange) {
    this.selected = true;
    this.selectedChild = event.value;
    this.selectedChildService.changeChild(event.value);
  }
}
