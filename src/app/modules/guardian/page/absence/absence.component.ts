import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Absence} from '../../../../data/model/absence/absence';
import {DayOffWork} from '../../../../data/model/absence/day-off-work';
import {DayOffWorkService} from '../../../../data/service/absence/day-off-work.service';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {Child} from '../../../../data/model/users/child';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {Observable} from 'rxjs';
import {MatCalendar} from '@angular/material/datepicker';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AbsenceComponent implements OnInit {
  @ViewChild('calendar') myCalendar: MatCalendar<any>;

  selectedDate: any;
  selectedChild: Observable<Child>;
  dayOffWorks: Array<DayOffWork>;

  absences: Array<Absence> = new Array<Absence>();
  daysOff: Observable<Array<DayOffWork>>;

  dateCssClass = (d: Date) => {
    const isDayOff = this.dayOffWorks.some(data => {
      const newDate = new Date(data.date);
      return newDate.getFullYear() === d.getFullYear() && newDate.getMonth() === d.getMonth() && newDate.getDate() === d.getDate();
    });
    return (isDayOff) ? 'day-off-work ' : '';
  }

  constructor(private dayOffWorkService: DayOffWorkService,
              private absenceService: AbsenceService,
              private selectedChildService: SelectedChildService) {
    this.selectedChild = selectedChildService.selectedChild;
    this.daysOff = dayOffWorkService.findAllDaysOffWork();
  }


  ngOnInit(): void {

    this.selectedChild.subscribe(child => {
      this.absenceService.getAllAbsencesByChildId(child.id).subscribe(absence => {
        this.absences = absence;
      });
    });

    this.daysOff.subscribe(resp => {
      this.dayOffWorks = resp;
      this.myCalendar.updateTodaysDate();
    });
  }

  monthSelected($event: any) {

  }

  dateChanged() {
    console.log(this.selectedDate);
  }


}

