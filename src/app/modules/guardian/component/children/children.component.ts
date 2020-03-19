import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GuardianService} from '../../../../data/service/guardian.service';
import {Observable} from 'rxjs';
import {Child} from '../../../../data/model/child';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildrenComponent implements OnInit {
  selected: any;
  children: Observable<Array<Child>>;


  constructor(private guardianService: GuardianService) {
    this.children = this.guardianService.children;
  }

  ngOnInit(): void {
  }

}
