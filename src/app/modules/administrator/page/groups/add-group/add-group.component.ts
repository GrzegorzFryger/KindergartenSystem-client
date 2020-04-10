import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {Group} from '../../../../../data/model/groups/group';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  groupName: string;
  groupDescription: string;
  group: Group;

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
  }

  addGroup(groupN: string, groupDes: string) {
    this.group = new Group();
    this.group.groupName = groupN;
    this.group.groupDescription = groupDes;
    this.groupService.createGroup(this.group);
  }

}
