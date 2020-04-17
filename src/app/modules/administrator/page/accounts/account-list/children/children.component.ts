import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {Child} from '../../../../../../data/model/accounts/child';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss', '../common-account-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildrenComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() checkedChildrenEvent: EventEmitter<Array<Child>>;
  @Input() mode: string;

  dataSource: MatTableDataSource<Child> = new MatTableDataSource();
  columnsToDisplay: string[] = ['name', 'surname', 'pesel', 'gender'];
  selectionObservable: Observable<SelectionChange<Child>>;
  selection = new SelectionModel<Child>(true, []);
  childCardIsOpen: boolean;
  dataToChildProfile: { child: Child, mode: string };

  private children: Observable<Array<Child>>;

  constructor(private childService: ChildService) {
    this.children = this.childService.getAllChildren();
    this.dataToChildProfile = {child: new Child(), mode: 'read'};
    this.checkedChildrenEvent = new EventEmitter<Array<Child>>();
    this.selectionObservable = this.selection.changed.asObservable();
  }

  ngOnInit(): void {
    this.onComponentMode();

    this.children.subscribe(children => {
      this.dataSource.data = children;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });

    this.selectionObservable.subscribe((selections) =>
      this.checkedChildrenEvent.emit(selections.source.selected)
    );

  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  receiveDataFromPersonDetail(event: { closeProfileCard: boolean }) {
    this.childCardIsOpen = !event.closeProfileCard;
  }

  onSelectChild(children: any) {
    this.childCardIsOpen = true;
    this.dataToChildProfile.child = children;
    this.dataToChildProfile.mode = this.mode;
  }

  private onComponentMode() {
    if (this.mode === 'read') {
      this.columnsToDisplay.push('select');
    } else {
      this.columnsToDisplay.push('dateOfBirth', 'startDate', 'endDate');
    }
  }

}
