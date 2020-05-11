import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Group} from '../../../../../data/model/groups/group';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public columnsToDisplay: string[] = ['name', 'description'];

  groups: Observable<Array<Group>>;
  public dataSource: MatTableDataSource<Group> = new MatTableDataSource();

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.initializeTables();
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
