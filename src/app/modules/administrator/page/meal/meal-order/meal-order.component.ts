import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCalendar, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {DayOffWork} from '../../../../../data/model/absence/day-off-work';
import {Absence} from '../../../../../data/model/absence/absence';
import {Observable} from 'rxjs';
import {Child} from '../../../../../data/model/accounts/child';
import {DayOffWorkService} from '../../../../../data/service/absence/day-off-work.service';
import {AbsenceService} from '../../../../../data/service/absence/absence.service';
import {SelectedChildService} from '../../../../guardian/component/children/selected-child.service';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../../core/snack-message-handling/snack-message-handling.service';


@Component({
  selector: 'app-meal-order',
  templateUrl: './meal-order.component.html',
  styleUrls: ['./meal-order.component.scss']
})
export class MealOrderComponent implements OnInit {
  @ViewChild('calendar')
  myCalendar: MatCalendar<any>;
  selectedDate: any;
  maxDate: Date = new Date();


  constructor() {

  }


  ngOnInit(): void {

  }


}

