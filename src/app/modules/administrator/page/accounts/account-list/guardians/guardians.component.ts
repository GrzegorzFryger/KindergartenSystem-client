import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Guardian} from '../../../../../../data/model/accounts/guardian';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {GuardianService} from '../../../../../../data/service/accounts/guardian.service';
import {InputPerson, PersonType} from '../../../../../../data/model/accounts/input-person';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-guardians',
  templateUrl: './guardians.component.html',
  styleUrls: ['./guardians.component.scss', '../common-account-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuardiansComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() checkedGuardianEvent: EventEmitter<Array<Guardian>>;
  @Input() mode: string;

  dataSource: MatTableDataSource<Guardian> = new MatTableDataSource();
  columnsToDisplay: string[] = ['name', 'surname', 'phone', 'email'];
  selectionObservable: Observable<SelectionChange<Guardian>>;
  selection = new SelectionModel<Guardian>(true, []);

  personDetailCardOpen: boolean;
  personToDisplay: InputPerson;

  private personFormInitial: Guardian;
  private guardians: Observable<Array<Guardian>>;

  constructor(private guardianService: GuardianService) {
    this.guardians = this.guardianService.getAllGuardian();
    this.personFormInitial = new Guardian();
    this.checkedGuardianEvent = new EventEmitter<Array<Guardian>>();
    this.selectionObservable = this.selection.changed.asObservable();
  }

  ngOnInit(): void {
    this.onComponentMode();

    this.dataSource.paginator = this.paginator;
    this.guardians.subscribe(guardians => {
      this.dataSource.data = guardians;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });

    this.selectionObservable.subscribe((selections) =>
      this.checkedGuardianEvent.emit(selections.source.selected)
    );
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectGuardian(guardian: Guardian) {
    this.personDetailCardOpen = true;
    this.personToDisplay = {type: PersonType.Guardian, data: guardian};
  }

  receiveDataFromPersonDetail(event: { closeProfileCard: boolean }) {
    this.personDetailCardOpen = !event.closeProfileCard;
  }

  private onComponentMode() {
    if (this.mode === 'read') {
      this.columnsToDisplay.push('select');
    } else {
      this.columnsToDisplay.push('status');
    }
  }
}
