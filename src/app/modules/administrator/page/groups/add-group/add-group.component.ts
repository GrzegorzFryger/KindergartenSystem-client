import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../../../data/model/groups/group';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {ValidatorsService} from '../../../../../data/service/validation/validators.service';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  group: Group;
  public form: FormGroup;
  formResponse: Observable<Group>;
  formResponseSub: Subject<Group>;

  public groupName = '';
  public groupDescription = '';

  constructor(private fb: FormBuilder) {
    this.formResponseSub = new Subject<Group>();
    this.formResponse = this.formResponseSub.asObservable();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  addGroupSubmit() {
    this.group = new Group();
    this.group.groupName = this.form.get('groupName').value;
    this.group.groupDescription = this.form.get('groupDescription').value;

    this.formResponseSub.next(this.group);
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      groupName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      groupDescription: [
        '',
        [Validators.required, Validators.minLength(5)]
      ]
    });
  }

}
