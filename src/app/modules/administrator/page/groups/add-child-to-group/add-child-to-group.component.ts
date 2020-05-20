import {Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Child} from '../../../../../data/model/accounts/child';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {ChildService} from '../../../../../data/service/accounts/child.service';

@Component({
  selector: 'app-add-child-to-group',
  templateUrl: './add-child-to-group.component.html',
  styleUrls: ['./add-child-to-group.component.scss']
})
export class AddChildToGroupComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  selectedChildId: string;
  dataSource: MatTableDataSource<Child> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['name', 'surname', 'pesel', 'selected'];

  constructor(public dialogRef: MatDialogRef<AddChildToGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private groupService: GroupService,
              private childService: ChildService) {
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.updateSize('60%', '60%');
    this.initializeTable();
  }

  addChildToGroup() {
    this.data = this.selectedChildId;
    this.dialogRef.close(this.data);
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  getChildIdOnClick(childId: string): void {
    this.selectedChildId = childId;
  }

  private initializeTable(): void {
    this.childService.getAllChildren().subscribe(resp => {
      this.dataSource.data = resp;
      this.dataSource.sort = this.sort.toArray()[0];
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.paginator._intl.firstPageLabel = 'Ilość rekordów na stronę';
    });
  }

}
