import {Component, OnInit, OnDestroy} from '@angular/core';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {Observable, Subscription} from 'rxjs';
import {Child} from '../../../../data/model/accounts/child';

@Component({
  selector: 'app-children-details',
  templateUrl: './children-details.component.html',
  styleUrls: ['./children-details.component.scss']
})
export class ChildrenDetailsComponent implements OnInit, OnDestroy {

  selectedChild: Observable<Child>;
  selectedChildId: string;

  private childSubscription: Subscription;

  constructor(private absenceService: AbsenceService,
              private selectedChildService: SelectedChildService) {
    this.selectedChild = selectedChildService.selectedChild;
  }

  ngOnInit(): void {
    this.childSubscription = this.selectedChild.subscribe(child => {
      this.selectedChildId = child.id;
    });
  }

  ngOnDestroy(): void {
    this.childSubscription.unsubscribe();
  }

}
