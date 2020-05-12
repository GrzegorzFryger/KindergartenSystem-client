import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Child} from '../../../../../data/model/accounts/child';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: {
    data: Observable<Array<Child>>,
    columnToDisplay: Observable<Array<string>>,
    filterPredicate: (data: Child, filter: string) => boolean,
    select: Observable<any>
  };
  @Output() outputDataEmitter: EventEmitter<{ selected: any }>;

  public dataSourceToDisplay: MatTableDataSource<Child>;
  public columnsToDisplay: string[];
  private dataSub: Subscription;

  constructor() {
    this.dataSourceToDisplay = new MatTableDataSource();
    this.outputDataEmitter = new EventEmitter<{ selected: any }>();
  }

  ngOnInit(): void {
    this.dataSub = this.dataSource.data.subscribe(data => {
      if (data) {
        this.dataSourceToDisplay.data = data;
        this.dataSource.columnToDisplay.subscribe(col => {
          this.columnsToDisplay = col;
        });
        this.dataSourceToDisplay.sort = this.sort;
        this.dataSourceToDisplay.paginator = this.paginator;
        this.dataSourceToDisplay.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';

        if (this.dataSource.filterPredicate) {
          this.dataSourceToDisplay.filterPredicate = this.dataSource.filterPredicate;
        }
      }
    });

  }

  public onSelect(sel: any): void {
    this.outputDataEmitter.emit({selected: sel});
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceToDisplay.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
