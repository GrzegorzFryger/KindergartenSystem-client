import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../../../data/model/groups/group';
import {Observable, Subject} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';

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

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddGroupComponent>) {
    this.formResponseSub = new Subject<Group>();
    this.formResponse = this.formResponseSub.asObservable();
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.initializeForm();
  }

  addGroupSubmit() {
    this.group = new Group();
    this.group.groupName = this.form.get('groupName').value;
    this.group.groupDescription = this.form.get('groupDescription').value;

    this.formResponseSub.next(this.group);
    this.dialogRef.close(null);
  }

  cancelClick(): void {
    this.dialogRef.close(null);
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
