import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {Child} from '../../../../../../data/model/accounts/child';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss', '../common-account-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildrenComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
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

  receiveDataFromPersonDetail(event: {closeProfileCard: boolean}) {
    this.childCardIsOpen  = !event.closeProfileCard;
  }

  selectChildren(children: any) {
    this.childCardIsOpen = true;
    console.log(children);
    this.childToDisplay = children;
  }

}
