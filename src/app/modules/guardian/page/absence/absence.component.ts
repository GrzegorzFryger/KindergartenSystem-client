import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {Absence} from '../../../../data/model/absence/absence';
import {DayOffWork} from '../../../../data/model/absence/day-off-work';
import {DayOffWorkService} from '../../../../data/service/absence/day-off-work.service';
import {AbsenceService} from '../../../../data/service/absence/absence.service';
import {Child} from '../../../../data/model/accounts/child';
import {SelectedChildService} from '../../component/children/selected-child.service';
import {Observable} from 'rxjs';
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
export class AbsenceComponent implements OnInit {

  @ViewChild('test')
  private animateThis: ElementRef;
  @ViewChild('calendar')
  myCalendar: MatCalendar<any>;
  selectedDate: Date;
  dayOffWorks: Array<DayOffWork>;
  absences: Array<Absence>;
  daysEvents: Array<string>;

  selectedChildId: string;
  selectedChild: Observable<Child>;
  resize: boolean;

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
              public dialog: MatDialog,
              private  snackErrorHandlingService: SnackMessageHandlingService,
              private render: Renderer2
  ) {
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
    //todo
  }

  dateChanged() {
    this.daysEvents = [];

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

    this.resize = true;
    this.render.addClass(this.animateThis.nativeElement, 'move');
    setTimeout(() => {
      this.render.removeClass(this.animateThis.nativeElement, 'move');
    }, 700);

  }

  openDialog() {
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
          this.snackErrorHandlingService.error('can not add absence');
        });
    });

    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
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

