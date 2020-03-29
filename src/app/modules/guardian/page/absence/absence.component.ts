import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Absence} from '../../../../data/model/absence/absence';
import {DayOffWork} from '../../../../data/model/absence/day-off-work';
import {DayOffWorkService} from '../../../../data/service/absence/day-off-work.service';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {Child} from '../../../../data/model/users/child';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {Observable} from 'rxjs';
import {MatCalendar, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {AbsenceDialogComponent} from './absence-dialog/absence-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AbsenceComponent implements OnInit {
  @ViewChild('calendar')
  myCalendar: MatCalendar<any>;
  selectedDate: any;
  dayOffWorks: Array<DayOffWork>;
  absences: Array<Absence>;
  daysEvents: Array<string>;

  selectedChildId: string;
  selectedChild: Observable<Child>;

  dateCssClass = (d: Date): MatCalendarCellCssClasses => {
    const cssClasses = new Set();

    if (this.contains(this.absences, d)) {
      cssClasses.add('absence');
    }

    if (this.contains(this.dayOffWorks, d)) {
      cssClasses.add('day-off-work');
    }

    return cssClasses;
  };

  constructor(private dayOffWorkService: DayOffWorkService,
              private absenceService: AbsenceService,
              private selectedChildService: SelectedChildService,
              public dialog: MatDialog) {
    this.selectedChild = selectedChildService.selectedChild;
    this.daysEvents = new Array<string>();
  }


  ngOnInit(): void {
    this.selectedChild.subscribe(child => {
      this.selectedChildId = child.id;
      this.absenceService.getAllAbsencesByChildId(child.id).subscribe(absence => {
        this.absences = absence;
        this.myCalendar.updateTodaysDate();
      });
    });

    this.dayOffWorkService.findAllDaysOffWork().subscribe(resp => {
        this.dayOffWorks = resp;
        this.myCalendar.updateTodaysDate();
      }
    );

    this.selectedDate = new Date();
  }

  monthSelected($event: any) {

  }

  dateChanged() {
    if (this.absences) {
      this.daysEvents = this.absences.filter(absence => {
        const newDate = new Date(absence.date);
        return newDate.getFullYear() === this.selectedDate.getFullYear() && newDate.getMonth() === this.selectedDate.getMonth()
          && newDate.getDate() === this.selectedDate.getDate();
      }).map(absence => absence.reason);
    }

    if (this.dayOffWorks) {
      this.daysEvents.push(this.dayOffWorks.filter(absence => {
        const newDate = new Date(absence.date);
        return newDate.getFullYear() === this.selectedDate.getFullYear() && newDate.getMonth() === this.selectedDate.getMonth()
          && newDate.getDate() === this.selectedDate.getDate();
      }).map(absence => absence.name).toString());
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AbsenceDialogComponent, {
      width: '700px',
      height: '300px',
      data: {childId: this.selectedChildId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private contains(arr: Array<any>, dateToCheck: Date): boolean {
    if (arr) {
      return arr.some(data => {
        const newDate = new Date(data.date);
        return newDate.getFullYear() === dateToCheck.getFullYear() && newDate.getMonth() === dateToCheck.getMonth()
          && newDate.getDate() === dateToCheck.getDate();
      });
    }
  }
}

