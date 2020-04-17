import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {ChildService} from '../../../../../../data/service/users/child.service';
import {Child} from '../../../../../../data/model/users/child';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss', '../common-account-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() childOutputEmitter: EventEmitter<boolean>;
  @Input() child: Child;

  dataSource: MatTableDataSource<Child> = new MatTableDataSource();
  columnsToDisplay: string[] = ['name', 'surname', 'pesel', 'gender', 'dateOfBirth', 'startDate', 'endDate'];
  childCardIsOpen: boolean;
  childToDisplay: Child;

  private children: Observable<Array<Child>>;

  constructor(private childService: ChildService) {
    this.children = this.childService.getAllChildren();
  }

  ngOnInit(): void {
    this.children.subscribe(children => {
      this.dataSource.data = children;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  receiveFromPersonComponent($event) {
    this.childCardIsOpen = $event;
  }

  selectChildren(children: any) {
    this.childCardIsOpen = true;
    console.log(children);
    this.childToDisplay = children;
  }

}
