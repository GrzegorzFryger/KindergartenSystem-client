import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {AbsenceService} from '../../../../../data/service/absence/absence.service';
import {Group} from '../../../../../data/model/groups/group';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-check-absence',
  templateUrl: './check-absence.component.html',
  styleUrls: ['./check-absence.component.scss']
})
export class CheckAbsenceComponent implements OnInit {

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

}
