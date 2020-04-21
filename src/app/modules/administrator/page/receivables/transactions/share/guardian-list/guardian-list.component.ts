import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Guardian} from '../../../../../../../data/model/accounts/guardian';

@Component({
  selector: 'app-guardian-list',
  templateUrl: './guardian-list.component.html',
  styleUrls: ['./guardian-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuardianListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dataSource: { guardians: Observable<Array<Guardian>>, columnToDisplay: Array<string> };
  @Output() checkedGuardiansEvent: EventEmitter<{ selected: string }>;


  public guardianDataSource: MatTableDataSource<Guardian>;
  public guardianColumnsToDisplay: string[];
  private dataSub: Subscription;

  constructor() {
    this.checkedGuardiansEvent = new EventEmitter<{ selected: string }>();
    this.guardianDataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSub = this.dataSource.guardians.subscribe(guard => {
      this.guardianDataSource.data = guard;
      this.guardianColumnsToDisplay = this.dataSource.columnToDisplay;
      this.guardianDataSource.sort = this.sort;
      this.guardianDataSource.paginator = this.paginator;
      this.guardianDataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.guardianDataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  selectGuardian(id: string) {
    this.checkedGuardiansEvent.emit({selected: id});
  }
}
