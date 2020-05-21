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

@Component({
  selector: 'app-check-absence',
  templateUrl: './check-absence.component.html',
  styleUrls: ['./check-absence.component.scss']
})
export class CheckAbsenceComponent implements OnInit {

  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public columnsToDisplay: string[] = ['name', 'surname', 'checkbox'];
  dataSource: MatTableDataSource<Child> = new MatTableDataSource();

  private groupListObservable: Observable<Array<Group>>;
  groupList: Array<Group>;
  selectedGroupId: string;
  absentChildrenList: Array<string>;
  absenceToAdd: Absence;


  constructor(private groupService: GroupService,
              private absenceService: AbsenceService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.groupListObservable = this.groupService.getAllGroups();
    this.groupListObservable.subscribe(resp => {
      this.groupList = resp;
    });
  }

  fillTableData(): void {
    this.absentChildrenList = new Array<string>();
    this.groupService.findAllChildrenInGroup(this.selectedGroupId).subscribe(resp => {
      this.dataSource.data = resp;
      resp.forEach(child => this.absentChildrenList.push(child.id));
      this.dataSource.sort = this.sort.toArray()[0];
    });
  }

  onBoxCheck(childId: string): void {
    if (this.absentChildrenList.includes(childId)) {
      this.absentChildrenList.splice(this.absentChildrenList.indexOf(childId), 1);
    } else {
      this.absentChildrenList.push(childId);
    }
  }

  submitAbsenceList(): void {
    if (this.absentChildrenList.length > 0) {
      this.absentChildrenList.forEach(id => {
        this.absenceToAdd = new Absence();
        this.absenceToAdd.reason = 'Nieusprawiedliwiona';
        this.absenceToAdd.date = this.convertToDate(new Date());
        this.absenceToAdd.childId = id;
        this.absenceService.createAbsence(this.absenceToAdd).subscribe(resp => console.log(resp));
      });
    }
  }

  private convertToDate(date: Date): Date {
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd'));
  }

}
