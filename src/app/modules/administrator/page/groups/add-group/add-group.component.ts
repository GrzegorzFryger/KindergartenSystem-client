import {Component, OnInit} from '@angular/core';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {Group} from '../../../../../data/model/groups/group';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  group: Group;

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
  }

  onSubmit(submittedForm) {
    this.group = new Group();
    this.group.groupName = submittedForm.value.groupName;
    this.group.groupDescription = submittedForm.value.groupDescription;
    this.groupService.createGroup(this.group).subscribe(res => {
      console.log(res);
    });
  }

}
