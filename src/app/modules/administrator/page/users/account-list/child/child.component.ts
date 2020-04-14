import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {ChildService} from '../../../../../../data/service/users/child.service';
import {Child} from '../../../../../../data/model/users/child';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss', '../common-account-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildComponent implements OnInit {

  children: Observable<Array<Child>>;
  dataSource: MatTableDataSource<Child> = new MatTableDataSource();
  columnsToDisplay: string[] = ['name', 'surname', 'pesel', 'gender', 'dateOfBirth', 'startDate', 'endDate'];
  childToDisplay: Child;
  childCardIsOpen: boolean;

  constructor(private childService: ChildService) {
    this.children = this.childService.getAllChildren();
  }

  ngOnInit(): void {
    this.children.subscribe(children => {
      this.dataSource.data = children;
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  receiveFromPersonComponent($event) {
    this.childCardIsOpen = $event;
  }

  selectChildren(children: any) {
    this.childCardIsOpen = true;
    this.childToDisplay = children;
  }
}
