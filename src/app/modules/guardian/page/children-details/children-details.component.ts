import {Component, OnInit, OnDestroy, ViewChildren, QueryList} from '@angular/core';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {Observable, Subscription} from 'rxjs';
import {Child} from '../../../../data/model/accounts/child';
import {Absence} from '../../../../data/model/absence/absence';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AddAbsenceForChildDialogComponent} from './add-absence-for-child-dialog/add-absence-for-child-dialog.component';
import {SnackMessageHandlingService} from '../../../../core/snack-message-handling/snack-message-handling.service';

@Component({
  selector: 'app-children-details',
  templateUrl: './children-details.component.html',
  styleUrls: ['./children-details.component.scss']
})
export class ChildrenDetailsComponent implements OnInit, OnDestroy {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public absenceDataSource: MatTableDataSource<Absence> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['date', 'reason'];

  selectedChild: Observable<Child>;
  selectedChildId: string;
  selectedChildName: string;

  private childSubscription: Subscription;

  constructor(private absenceService: AbsenceService,
              private selectedChildService: SelectedChildService,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService) {
    this.selectedChild = selectedChildService.selectedChild;
  }

  ngOnInit(): void {
    this.childSubscription = this.selectedChild.subscribe(child => {
      this.selectedChildId = child.id;
      this.selectedChildName = child.name + ' ' + child.surname;
      this.fillTableData(this.selectedChildId);
    });
  }

  addAbsenceForChild() {
    this.openAddAbsenceDialog(this.selectedChildId);
  }

  private openAddAbsenceDialog(data: string): void {
    const dialogRef = this.dialog.open(AddAbsenceForChildDialogComponent, {
      data: {childId: this.selectedChildId}
    });

    const sub = dialogRef.componentInstance.formResponse.subscribe(resp => {
      this.dialog.closeAll();
      this.absenceService.createAbsences(resp).subscribe(
        () => {
          this.snackMessageHandlingService.success('Pomyślnie dodano nieobecności');
        },
        error => {
          this.snackMessageHandlingService.error('Nie udało się dodać nieobecności');
        });
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fillTableData(this.selectedChildId);
      sub.unsubscribe();
    });
  }

  fillTableData(childId: string): void {
    this.absenceService.getAllAbsencesByChildId(childId).subscribe(absences => {
      this.absenceDataSource.data = absences;
      this.absenceDataSource.sort = this.sort.toArray()[0];
      this.absenceDataSource.paginator = this.paginator.toArray()[0];
    });
  }

  ngOnDestroy(): void {
    this.childSubscription.unsubscribe();
  }

}
