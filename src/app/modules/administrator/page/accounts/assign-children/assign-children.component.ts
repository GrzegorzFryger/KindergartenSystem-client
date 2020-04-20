import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Child} from '../../../../../data/model/accounts/child';
import {Guardian} from '../../../../../data/model/accounts/guardian';
import {GuardianService} from '../../../../../data/service/accounts/guardian.service';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';
import {Router} from '@angular/router';

const SUCCESS_MESSAGE = (guardian: Array<Guardian>) =>
  guardian.map(guar => `Udało się dodać wybrane dzieci do  ${guar.name}  ${guar.surname}`).toString();

@Component({
  selector: 'app-assign-children',
  templateUrl: './assign-children.component.html',
  styleUrls: ['./assign-children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssignChildrenComponent implements OnInit {
  listMode = 'read';

  selectedChildren: Array<Child>;
  selectedGuardians: Array<Guardian>;
  isLinear: boolean;

  constructor(private guardianService: GuardianService,
              private snackMessageHandlingService: SnackMessageHandlingService,
              private router: Router) {
    this.selectedGuardians = new Array<Guardian>();
    this.selectedChildren = new Array<Child>();
  }

  ngOnInit(): void {
  }

  onSelectedChildren(event: Array<Child>) {
    this.selectedChildren = event;
  }

  onSelectedGuardian(event: Array<Guardian>) {
    this.selectedGuardians = event;
  }

  onSubmit() {
    const guardiansId = this.selectedGuardians.map(guardian => guardian.id);
    const childrenId = this.selectedChildren.map(child => child.id);

    if (guardiansId && childrenId) {
      this.guardianService.appendChildToGuardian({guardianId: guardiansId, childId: childrenId})
        .subscribe(guardianRes => {
          this.snackMessageHandlingService.success(SUCCESS_MESSAGE(guardianRes));
          this.navigateToParent();
        });
    }
  }

  private navigateToParent() {
    setTimeout(() => this.router.navigate(['/administrator/accounts'], {state: {state: 'back'}}), 500);
  }
}
