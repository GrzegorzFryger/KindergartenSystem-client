import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Child} from '../../../../../../../data/model/accounts/child';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildrenListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: { children: Observable<Array<Child>>, columnToDisplay: Array<string> };
  @Output() outputDataEmitter: EventEmitter<{ selected: string }>;

  public childDataSource: MatTableDataSource<Child>;
  public childColumnsToDisplay: string[];
  private dataSub: Subscription;

  constructor() {
    this.childDataSource = new MatTableDataSource();
    this.outputDataEmitter = new EventEmitter<{ selected: string }>();
  }

  ngOnInit(): void {
    this.dataSub = this.dataSource.children.subscribe(children => {
      if (children) {
        this.childDataSource.data = children;
        this.childColumnsToDisplay = this.dataSource.columnToDisplay;
        this.childDataSource.sort = this.sort;
        this.childDataSource.paginator = this.paginator;
        this.childDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
      }
    });
  }

  public selectChild(childId: string): void {
    console.log('Selected child: ' + childId);
    this.outputDataEmitter.emit({selected: childId});
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.childDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
