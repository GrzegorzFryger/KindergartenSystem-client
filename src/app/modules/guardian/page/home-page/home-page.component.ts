import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatCalendar, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {DayOffWork} from '../../../../data/model/absence/day-off-work';
import {Absence} from '../../../../data/model/absence/absence';
import {Observable} from 'rxjs';
import {Child} from '../../../../data/model/accounts/child';
import {DayOffWorkService} from '../../../../data/service/absence/day-off-work.service';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../core/snack-message-handling/snack-message-handling.service';
import {ChildService} from '../../../../data/service/accounts/child.service';
import {GuardianService} from '../../../../data/service/accounts/guardian.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @ViewChild('dateSelectHeader')
  private dateSelectHeader: ElementRef;
  @ViewChild('dateDescription')
  private dateDescription: ElementRef;

  @ViewChild('calendar')
  myCalendar: MatCalendar<any>;
  @ViewChild('calendar')
  private calendar: ElementRef;

  selectedDate: Date;
  dayOffWorks: Array<DayOffWork>;
  absences: Array<Absence>;
  daysEvents: Array<string>;

  resize: boolean;

  guardianChildren: Observable<Array<Child>>;

  constructor(private dayOffWorkService: DayOffWorkService,
              private absenceService: AbsenceService,
              private selectedChildService: SelectedChildService,
              private childService: ChildService,
              private guardianService: GuardianService,
              public dialog: MatDialog,
              private  snackErrorHandlingService: SnackMessageHandlingService,
              private render: Renderer2) {
    this.daysEvents = new Array<string>();
    this.selectedDate = new Date();
    this.absences = new Array<Absence>();
  }

  ngOnInit(): void {
    this.guardianChildren = this.guardianService.findAllGuardianChildren(this.guardianService.userId);
    this.guardianChildren.subscribe(children => {
        children.forEach(child => this.absenceService.getAllAbsencesByChildId(child.id).subscribe(absence => {
          absence.forEach(resp => this.absences.push(resp));
          this.myCalendar.updateTodaysDate();
        }));
      }
    );

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

    if (this.contains(this.dayOffWorks, d)) {
      cssClasses.add('day-off-work');
    }

    return cssClasses;
  };

  dateChanged() {
    this.daysEvents = [];
    if (this.absences) {
      this.daysEvents = this.absences.filter(absence => this.equalsSelectedDate(absence)).map(absence => absence.reason);
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

  private contains(arr: Array<any>, dateToCheck: Date): boolean {
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
