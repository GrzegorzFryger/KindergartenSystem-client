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
  selectedGroupId: string;
  // absentChildrenList: Array<string>;
  absenceToAdd: Absence;
  absenceListForToday: Array<Absence>;
  today: Date;


  constructor(private groupService: GroupService,
              private absenceService: AbsenceService,
              private datePipe: DatePipe,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.today = new Date();
    this.groupListObservable = this.groupService.getAllGroups();
    this.groupListObservable.subscribe(resp => {
      this.groupList = resp;
    });
  }

  fillTables(): void {
    this.presentChildrenList = new Array<Child>();
    this.absentChildrenList = new Array<Child>();
    this.fillChildListTable();
    this.presentDataSource.data = this.presentChildrenList;
    this.absentDataSource.data = this.absentChildrenList;
  }

  fillChildListTable(): void {
    this.groupService.findAllChildrenInGroup(this.selectedGroupId).subscribe(resp => {
      this.childrenInGroupList = resp;
      this.groupListDataSource.data = this.childrenInGroupList;
    });
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
      this.groupList = this.groupList.filter(child => this.absenceListForToday.some(x => x.childId === child.id.toString()));
    });
  }

  // fillGroupListTableData(): void {
  //   this.absentChildrenList = new Array<string>();
  //   this.groupService.findAllChildrenInGroup(this.selectedGroupId).subscribe(resp => {
  //     this.groupListDataSource.data = resp;
  //     resp.forEach(child => this.absentChildrenList.push(child.id));
  //     this.groupListDataSource.sort = this.sort.toArray()[0];
  //   });
  // }


  // private submitAbsences(confirmation: boolean): void {
  //   if (confirmation) {
  //     if (this.absentChildrenList.length > 0) {
  //       this.absentChildrenList.forEach(id => {
  //         this.absenceToAdd = new Absence();
  //         this.absenceToAdd.reason = 'Nieusprawiedliwiona';
  //         this.absenceToAdd.date = this.convertToDate(new Date());
  //         this.absenceToAdd.childId = id;
  //         this.absenceService.createAbsence(this.absenceToAdd).subscribe(
  //           resp => {
  //             this.snackMessageHandlingService.success('Dodano nieobecności');
  //           }, error => {
  //             this.snackMessageHandlingService.error('Wystąpił problem z dodaniem nieobecności');
  //           },
  //           () => {
  //             // ON COMPLETE
  //           });
  //       });
  //     } else {
  //       this.snackMessageHandlingService.success('Wszyscy obecni!');
  //     }
  //   } else {
  //     // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
  //   }
  // }

  // private openConfirmationDialog(question: string): void {
  //   const data = new YesNoDialogData(question);
  //   const dialogRef = this.dialog.open(YesNoDialogComponent, {
  //     data: {data}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(
  //     result => {
  //       this.submitAbsences(result.answer);
  //     }
  //   );
  // }

  private getTodayDate() {
    this.today = new Date();
    const todayDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    return todayDate;
  }
}
