import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Group} from '../../../../../data/model/groups/group';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {YesNoDialogData} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog-data';
import {YesNoDialogComponent} from '../../../../../core/dialog/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public columnsToDisplay: string[] = ['groupName', 'groupDescription', 'actions'];

  groups: Observable<Array<Group>>;
  public dataSource: MatTableDataSource<Group> = new MatTableDataSource();

  constructor(private groupService: GroupService,
              private dialog: MatDialog,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.initializeTables();
  }

  public deleteGroup(groupId: string): void {
    this.openRemovalDialog('Czy na pewno usunąć tą grupę?', groupId);
  }

  private removeGroup(confirmation: boolean, id: string): void {
    if (confirmation) {
      this.groupService.deleteGroup(id).subscribe(
        resp => {
          this.snackMessageHandlingService.success('Grupa została usunięta');
          this.initializeTables();
        }, error => {
          this.snackMessageHandlingService.error('Wystąpił problem z usunięciem grupy');
        },
        () => {
          // ON COMPLETE
        }
      );
    } else {
      // DO NOT REMOVE ANYTHING WITHOUT USER CONFIRMATION
    }
  }

  private openRemovalDialog(question: string, dayOffWorkId: string): void {
    const data = new YesNoDialogData(question);
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {data}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('The dialog was closed with answer: ' + result.answer);
        this.removeGroup(result.answer, dayOffWorkId);
      }
    );
  }

  private initializeTables(): void {
    this.groupService.getAllGroups().subscribe(resp => {
      console.log(resp);
      this.dataSource.data = resp;
      this.dataSource.sort = this.sort.toArray()[0];
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.paginator._intl.firstPageLabel = 'Ilość rekordów na stronę';
    });
  }

}
