import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../../../data/model/groups/group';
import {GroupService} from '../../../../../data/service/groups/group.service';
import {ValidatorsService} from '../../../../../data/service/validation/validators.service';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  public form: FormGroup;

  public groupName = '';
  public groupDescription = '';

  constructor(private groupService: GroupService,
              private validationService: ValidatorsService,
              private fb: FormBuilder,
              private snackMessageHandlingService: SnackMessageHandlingService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  public addGroup() {
    const group = this.buildGroup();
    this.groupService.createGroup(group).subscribe(
      resp => {
      },
      error => {
        this.snackMessageHandlingService.error('Wystąpił problem z utworzeniem grupy');
      },
      () => {
        this.snackMessageHandlingService.success('Utworzono grupę');
        this.resetForm();
      }
    );
  }

  private buildGroup(): Group {
    const group = new Group();
    group.groupName = this.form.get('groupName').value;
    group.groupDescription = this.form.get('groupDescription').value;

    return group;
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

  private resetForm(): void {
    this.form.reset();
    this.groupName = '';
    this.groupDescription = '';
  }

}
