import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {Observable, Subscription} from 'rxjs';
import {Absence} from '../../../../data/model/absence/absence';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {AddAbsenceForChildDialogComponent} from './add-absence-for-child-dialog/add-absence-for-child-dialog.component';
import {SnackMessageHandlingService} from '../../../../core/snack-message-handling/snack-message-handling.service';
import {Child} from '../../../../data/model/accounts/child';
import {move, moveSecond} from '../animations';
import {YesNoDialogData} from '../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';
import {YesNoDialogComponent} from '../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';
import {DatePipe} from '@angular/common';
import {GroupService} from '../../../../data/service/groups/group.service';
import {Group} from '../../../../data/model/groups/group';

@Component({
  selector: 'app-children-details',
  templateUrl: './children-details.component.html',
  styleUrls: ['./children-details.component.scss'],
  providers: [DatePipe],
  animations: [move, moveSecond]
})
export class ChildrenDetailsComponent implements OnInit, OnDestroy {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  public absenceDataSource: MatTableDataSource<Absence> = new MatTableDataSource();
  public columnsToDisplay: string[] = ['date', 'reason', 'delete'];
  selectedChildId: string;
  selectedChildName: string;
  groupListForSelectedChild: Array<Group>;
  move = 'false';

  private childSubscription: Subscription;

  constructor(private absenceService: AbsenceService,
              private groupService: GroupService,
              private selectedChildService: SelectedChildService,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.childSubscription = this.selectedChildService.selectedChild.subscribe(child => {
      this.selectedChildId = child.id;
      this.selectedChildName = child.name + ' ' + child.surname;

      this.runAnimations();

      this.absenceService.getAllAbsencesByChildId(child.id).subscribe(absences => {
        this.absenceDataSource.data = absences;
        this.absenceDataSource.sort = this.sort.toArray()[0];
        this.absenceDataSource.paginator = this.paginator.toArray()[0];
      });

      this.groupService.findAllGroupsForChild(child.id).subscribe(groups => {
        this.groupListForSelectedChild = groups;
      });
    });
  }

  get getSelectedChild(): Observable<Child> {
    return this.selectedChildService.selectedChild;
  }

  addAbsenceForChild() {
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
      this.absenceDataSource.data = this.absenceDataSource.data.filter(data => data.id !== this.selectedChildId);
      sub.unsubscribe();
    });
  }

  isDateBefore(absenceDate: Date) {
    return this.datePipe.transform(absenceDate, 'yyyy-MM-dd') > this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.absenceDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteAbsence(id: string) {
    this.openRemovalDialog('Czy na pewno usunąć zaplanowaną nieobecność?', id);
  }

  private openRemovalDialog(question: string, absenceId: string): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.removeAbsence(result.answer, absenceId);
      }
    );
  }

  private removeAbsence(confirmation: boolean, id: string): void {
    if (confirmation) {
      this.absenceService.deleteAbsence(id).subscribe(
        resp => {
          this.snackMessageHandlingService.success('Nieobecność została usunięta');
        }, error => {
          this.snackMessageHandlingService.error('Wystąpił problem z usunięciem dnia wolnego');
        },
        () => {
          // ON COMPLETE
        }
      );
    } else {
      // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
    }
  }

  ngOnDestroy(): void {
    this.childSubscription.unsubscribe();
  }

  private runAnimations() {
    this.move = 'true';
    setTimeout(() => {
      this.move = 'false';
    }, 500);
  }
}
