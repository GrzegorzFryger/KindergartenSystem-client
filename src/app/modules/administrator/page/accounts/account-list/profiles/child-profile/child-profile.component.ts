import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Child} from '../../../../../../../data/model/accounts/child';
import {ChildService} from '../../../../../../../data/service/accounts/child.service';
import {SnackMessageHandlingService} from '../../../../../../../core/snack-message-handling/snack-message-handling.service';

@Component({
  selector: 'app-child-profile',
  templateUrl: './child-profile.component.html',
  styleUrls: ['./child-profile.component.scss', '../../common-profile-layout.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildProfileComponent implements OnInit {
  @Output() childOutputEmitter: EventEmitter<{closeProfileCard: boolean}>;
  @Input() child: Child;

  isEditCardOpen: boolean;
  personFormInitial: { [key: string]: any };
  private formOutput: { form: FormGroup };

  constructor(private childService: ChildService,
              private snackMessageHandlingService: SnackMessageHandlingService) {
    this.childOutputEmitter = new EventEmitter<{closeProfileCard: boolean}>();
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
    this.personFormInitial = this.child;
    this.isEditCardOpen = true;
  }

  onSubmit() {
    const childToUpdate = new Child(this.formOutput.form.value);
    childToUpdate.id = this.child.id;

    this.childService.updateChild(childToUpdate).subscribe(child => {
      this.formOutput.form.reset();
      this.snackMessageHandlingService.error('Utworzono pomyślnie');
      this.child = child;
      setTimeout(() => this.isEditCardOpen = false);
    });
  }

  formValuesChange(event: { form: FormGroup} ) {
    this.formOutput = event;
  }

}
