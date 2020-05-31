import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {AbsenceService} from '../../../../../data/service/absence/absence.service';
import {Group} from '../../../../../data/model/groups/group';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Child} from '../../../../../data/model/accounts/child';
import {MatSort} from '@angular/material/sort';
import {Absence} from '../../../../../data/model/absence/absence';
import {DatePipe} from '@angular/common';
import {YesNoDialogData} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';
import {YesNoDialogComponent} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-check-absence',
  templateUrl: './check-absence.component.html',
  styleUrls: ['./check-absence.component.scss']
})
export class CheckAbsenceComponent implements OnInit {

  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public columnsToDisplay: string[] = ['name', 'surname', 'actions'];
  groupListDataSource: MatTableDataSource<Child> = new MatTableDataSource();
  absentDataSource: MatTableDataSource<Child> = new MatTableDataSource();
  presentDataSource: MatTableDataSource<Child> = new MatTableDataSource();

  childrenInGroupList: Array<Child>;
  absentChildrenList: Array<Child>;
  presentChildrenList: Array<Child>;

  private groupListObservable: Observable<Array<Group>>;
  groupList: Array<Group>;
  groupsWithCheckedAbsence: Array<string>;
  selectedGroupId: string;
  absenceToAdd: Absence;
  absencesForPresentChildren: Array<Absence>;
  absenceListForToday: Array<Absence>;
  today: Date;


  constructor(private groupService: GroupService,
              private absenceService: AbsenceService,
              private datePipe: DatePipe,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.selectedGroupId = null;
    this.groupsWithCheckedAbsence = new Array<string>();
    this.childrenInGroupList = new Array<Child>();
    this.today = new Date();
    this.groupListObservable = this.groupService.getAllGroups();
    this.groupListObservable.subscribe(resp => {
      this.groupList = resp;
    });
  }

  fillTables(): void {
    this.childrenInGroupList = new Array<Child>();
    this.presentChildrenList = new Array<Child>();
    this.absentChildrenList = new Array<Child>();
    this.groupService.findAllChildrenInGroup(this.selectedGroupId).subscribe(resp => {
      this.childrenInGroupList = resp;
      this.groupListDataSource.data = this.childrenInGroupList;
      this.checkIfChildrenInGroupAlreadyAbsent();
    });

    if (this.groupsWithCheckedAbsence.includes(this.selectedGroupId)) {
      this.presentChildrenList = this.childrenInGroupList;
    }
    this.presentDataSource.data = this.presentChildrenList;
    this.absentDataSource.data = this.absentChildrenList;
    this.groupListDataSource.data = this.childrenInGroupList;
  }

  moveChildToPresent(child: Child) {
    this.childrenInGroupList.splice(this.groupListDataSource.data.indexOf(child), 1);
    this.groupListDataSource.data = this.childrenInGroupList;
    this.presentChildrenList.push(child);
    this.presentDataSource.data = this.presentChildrenList;
  }

  moveChildToAbsent(child: Child) {
    this.childrenInGroupList.splice(this.groupListDataSource.data.indexOf(child), 1);
    this.groupListDataSource.data = this.childrenInGroupList;
    this.absentChildrenList.push(child);
    this.absentDataSource.data = this.absentChildrenList;
  }

  moveAbsentToPresent(child: Child) {
    this.absentChildrenList.splice(this.absentChildrenList.indexOf(child), 1);
    this.absentDataSource.data = this.absentChildrenList;
    this.presentChildrenList.push(child);
    this.presentDataSource.data = this.presentChildrenList;
  }

  movePresentToAbsent(child: Child) {
    this.presentChildrenList.splice(this.presentChildrenList.indexOf(child), 1);
    this.presentDataSource.data = this.presentChildrenList;
    this.absentChildrenList.push(child);
    this.absentDataSource.data = this.absentChildrenList;
  }

  checkIfChildrenInGroupAlreadyAbsent(): void {
    this.absenceService.getAllAbsencesBetweenDates(this.getTodayDate(), this.getTodayDate()).subscribe(absences => {
      this.absenceListForToday = absences;
      this.absentChildrenList = this.childrenInGroupList.filter(child =>
        this.absenceListForToday.some(x => x.childId === child.id));
      this.absentDataSource.data = this.absentChildrenList;
      if (this.absentChildrenList.length > 0) {
        this.presentChildrenList = this.childrenInGroupList.filter(child => !this.absentChildrenList.includes(child));
        this.presentDataSource.data = this.presentChildrenList;
        this.childrenInGroupList = new Array<Child>();
        this.groupListDataSource.data = this.childrenInGroupList;
      } else if (this.groupsWithCheckedAbsence.includes(this.selectedGroupId) && this.absentChildrenList.length === 0) {
        this.presentChildrenList = this.childrenInGroupList;
        this.presentDataSource.data = this.presentChildrenList;
        this.childrenInGroupList = new Array<Child>();
        this.groupListDataSource.data = this.childrenInGroupList;
      }
    });
  }

  submitAbsenceCheck(): void {
    this.openConfirmationDialog('Zapisać obecności?');
  }

  private submitAbsences(confirmation: boolean): void {
    if (confirmation) {
      if (!this.groupsWithCheckedAbsence.includes(this.selectedGroupId)) {
        this.groupsWithCheckedAbsence.push(this.selectedGroupId);
      }

      if (!this.absenceListForToday.some(absence => this.absentChildrenList.some(x => x.id = absence.childId))) {
        this.absentChildrenList.forEach(child => {
          this.absenceToAdd = new Absence();
          this.absenceToAdd.reason = 'Nieusprawiedliwiona';
          this.absenceToAdd.date = this.today;
          this.absenceToAdd.childId = child.id;
          this.absenceService.createAbsence(this.absenceToAdd).subscribe(
            () => {
              // ON SUCCESS
            },
            error => {
              this.snackMessageHandlingService.error('Wystąpił problem z dodaniem nieobecności');
            },
            () => {
              // ON COMPLETE
            });
        });
      }

      this.absencesForPresentChildren = new Array<Absence>();
      this.absenceListForToday.forEach(absence => {
        if (this.presentChildrenList.some(child => child.id === absence.childId)) {
          this.absencesForPresentChildren.push(absence);
        }
      });

      this.absencesForPresentChildren.forEach(absence => {
        this.absenceService.deleteAbsence(absence.id).subscribe(() => {
            // ON SUCCESS
          },
          error => {
            this.snackMessageHandlingService.error('Wystąpił problem z usunięciem nieobecności');
          },
          () => {
            // ON COMPLETE
          }
        );
      });
    } else {
      // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
    }
    this.snackMessageHandlingService.success('Przesłano listę nieobecności');
  }

  private openConfirmationDialog(question: string): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.submitAbsences(result.answer);
      }
    );
  }

  private getTodayDate() {
    this.today = new Date();
    const todayDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    return todayDate;
  }
}
