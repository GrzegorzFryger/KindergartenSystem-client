import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {Absence} from '../../../../data/model/absence/absence';
import {DayOffWork} from '../../../../data/model/absence/day-off-work';
import {DayOffWorkService} from '../../../../data/service/absence/day-off-work.service';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {Child} from '../../../../data/model/accounts/child';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {Observable, Subscription} from 'rxjs';
import {MatCalendar, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {AbsenceDialogComponent} from './absence-dialog/absence-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackMessageHandlingService} from '../../../../core/snack-message-handling/snack-message-handling.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AbsenceComponent implements OnInit, OnDestroy {

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

  selectedChildId: string;
  selectedChild: Observable<Child>;
  resize: boolean;
  private childSubscription: Subscription;

  constructor(private dayOffWorkService: DayOffWorkService,
              private absenceService: AbsenceService,
              private selectedChildService: SelectedChildService,
              public dialog: MatDialog,
              private  snackErrorHandlingService: SnackMessageHandlingService,
              private render: Renderer2) {
    this.selectedChild = selectedChildService.selectedChild;
    this.daysEvents = new Array<string>();
    this.selectedDate = new Date();
  }

  ngOnInit(): void {
    this.childSubscription = this.selectedChild.subscribe(child => {
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

  ngOnDestroy(): void {
    this.childSubscription.unsubscribe();
  }

  addAbsence() {
    const dialogRef = this.dialog.open(AbsenceDialogComponent, {
      width: '700px',
      height: '550px',
      data: {childId: this.selectedChildId}
    });

    const sub = dialogRef.componentInstance.formResponse.subscribe(res => {
      this.dialog.closeAll();
      this.absenceService.createAbsences(res).subscribe(
        () => {
        },
        () => {
          this.snackErrorHandlingService.error('Nie można dodać nieobecności');
        });
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
      console.log('The dialog was closed');
    });
  }
}

