import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {AbsenceService} from '../../../../../data/service/absence/absence.service';
import {Group} from '../../../../../data/model/groups/group';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Child} from '../../../../../data/model/accounts/child';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-check-absence',
  templateUrl: './check-absence.component.html',
  styleUrls: ['./check-absence.component.scss']
})
export class CheckAbsenceComponent implements OnInit {

  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public columnsToDisplay: string[] = ['name', 'surname'];
  dataSource: MatTableDataSource<Child> = new MatTableDataSource();

  private groupListObservable: Observable<Array<Group>>;
  groupList: Array<Group>;
  selectedGroupId: string;

  constructor(private groupService: GroupService,
              private absenceService: AbsenceService) {
  }

  ngOnInit(): void {
    this.groupListObservable = this.groupService.getAllGroups();
    this.groupListObservable.subscribe(resp => {
      this.groupList = resp;
    });
  }

  fillTableData(): void {
    this.groupService.findAllChildrenInGroup(this.selectedGroupId).subscribe(resp => {
      this.dataSource.data = resp;
      this.dataSource.sort = this.sort.toArray()[0];
    });
  }

}
