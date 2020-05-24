import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatCalendar, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {DayOffWork} from '../../../../data/model/absence/day-off-work';
import {DayOffWorkService} from '../../../../data/service/absence/day-off-work.service';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../core/snack-message-handling/snack-message-handling.service';
import {ChildService} from '../../../../data/service/accounts/child.service';
import {GuardianService} from '../../../../data/service/accounts/guardian.service';
import {Child} from '../../../../data/model/accounts/child';
import {Absence} from '../../../../data/model/absence/absence';

interface AbsenceEvent {
  childObject: Child;
  absence: Absence;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  @ViewChild('calendar')
  myCalendar: MatCalendar<any>;
  @ViewChild('dateSelectHeader')
  private dateSelectHeader: ElementRef;
  @ViewChild('dateDescription')
  private dateDescription: ElementRef;
  @ViewChild('calendar')
  private calendar: ElementRef;

  selectedDate: Date;
  daysEvents: Array<string>;
  resize: boolean;

  private dayOffWorks: Array<DayOffWork>;
  private absences: Array<AbsenceEvent>;

  constructor(private dayOffWorkService: DayOffWorkService,
              private absenceService: AbsenceService,
              private selectedChildService: SelectedChildService,
              private childService: ChildService,
              private guardianService: GuardianService,
              public dialog: MatDialog,
              private  snackErrorHandlingService: SnackMessageHandlingService,
              private render: Renderer2) {
    this.daysEvents = new Array<string>();
    this.absences = new Array<AbsenceEvent>();
  }

  ngOnInit(): void {
    this.guardianService.children.subscribe(children => {
      children.forEach(child => {
        this.absenceService.getAllAbsencesByChildId(child.id).subscribe(absence => {
          absence.forEach(childAbsence => {
            this.absences.push({childObject: child, absence: childAbsence});
          });
          this.myCalendar.updateTodaysDate();
        });
      });
    });

    this.dayOffWorkService.findAllDaysOffWork().subscribe(resp => {
        this.dayOffWorks = resp;
        this.myCalendar.updateTodaysDate();
      }
    );
  }

  addDateCssClass = (d: Date): MatCalendarCellCssClasses => {
    const cssClasses = new Set();

    if (this.contains(this.absences, d)) {
      cssClasses.add('day-off-work');
    }

    if (this.containsDayOff(this.dayOffWorks, d)) {
      cssClasses.add('day-off-work');
    }

    return cssClasses;
  };

  dateChanged() {
    this.daysEvents = [];

    if (this.absences) {
      this.daysEvents = this.absences.filter(absence => this.equalsSelectedDate(absence.absence))
        .map(absence => `${absence.childObject.name} - ${absence.absence.reason} `);
    }

    if (this.dayOffWorks) {
      const daysOff = this.dayOffWorks.filter(absence => this.equalsSelectedDate(absence)).map(absence => absence.name).toString();
      if (daysOff !== '') {
        this.daysEvents.push(daysOff);
      }
    }

    this.resize = true;
    this.runAnimations();
  }

  // todo fix data type
  private contains(arr: Array<AbsenceEvent>, dateToCheck: Date): boolean {
    if (arr) {
      return arr.some(data => {
        const newDate = new Date(data.absence.date);
        return newDate.getFullYear() === dateToCheck.getFullYear() && newDate.getMonth() === dateToCheck.getMonth()
          && newDate.getDate() === dateToCheck.getDate();
      });
    }
  }

  // todo fix data type
  private containsDayOff(arr: Array<DayOffWork>, dateToCheck: Date): boolean {
    if (arr) {
      return arr.some(data => {
        const newDate = new Date(data.date);
        return newDate.getFullYear() === dateToCheck.getFullYear() && newDate.getMonth() === dateToCheck.getMonth()
          && newDate.getDate() === dateToCheck.getDate();
      });
    }
  }

  private equalsSelectedDate(absence: any): boolean {
    const newDate = new Date(absence.date);
    return newDate.getFullYear() === this.selectedDate.getFullYear() && newDate.getMonth() === this.selectedDate.getMonth()
      && newDate.getDate() === this.selectedDate.getDate();
  }

  private runAnimations(): void {
    setTimeout(() => {
      this.render.addClass(this.dateSelectHeader.nativeElement, 'move-header');
    }, 100);
    setTimeout(() => {
      this.render.removeClass(this.dateSelectHeader.nativeElement, 'move-header');
    }, 900);

    setTimeout(() => {
      this.render.addClass(this.dateSelectHeader.nativeElement, 'move-description');
    }, 100);

    setTimeout(() => {
      this.render.removeClass(this.dateSelectHeader.nativeElement, 'move-description');
    }, 900);
  }

}
