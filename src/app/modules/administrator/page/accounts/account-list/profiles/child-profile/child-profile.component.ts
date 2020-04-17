import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Child} from '../../../../../../../data/model/accounts/child';
import {ChildService} from '../../../../../../../data/service/accounts/child.service';
import {SnackErrorHandlingService} from '../../../../../../../core/snack-error-handling/snack-error-handling.service';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss', '../../common-profile-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildProfileComponent implements OnInit {
  @Output() childOutputEmitter: EventEmitter<{ closeProfileCard: boolean }>;
  @Input() inputData: { child: Child, mode: string };

  isEditCardOpen: boolean;
  personFormInitial: { [key: string]: any };
  private formOutput: { form: FormGroup };

  constructor(private childService: ChildService,
              private snackErrorHandlingService: SnackErrorHandlingService) {
    this.childOutputEmitter = new EventEmitter<{ closeProfileCard: boolean }>();
  }

  ngOnInit(): void {
  }

  close(type: string) {
    if (type === 'edit') {
      this.isEditCardOpen = false;
    } else {
      this.childOutputEmitter.emit({closeProfileCard: true});
    }
  }

  openEditCard() {
    this.personFormInitial = this.inputData.child;
    this.isEditCardOpen = true;
  }

  onSubmit() {
    this.updateChild();
  }

  formValuesChange(event: { form: FormGroup }) {
    this.formOutput = event;
  }

  private updateChild(): void {
    const childToUpdate = new Child(this.formOutput.form.value);
    childToUpdate.id = this.inputData.child.id;

    this.childService.updateChild(childToUpdate).subscribe(child => {
      this.formOutput.form.reset();
      this.snackErrorHandlingService.openSnackBar('Utworzono pomyślnie');
      this.inputData.child = child;
      setTimeout(() => this.isEditCardOpen = false);
    });
  }

}
