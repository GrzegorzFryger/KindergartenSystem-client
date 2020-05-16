import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbsenceService} from '../../../../../../data/service/absence/absence.service';
import {Absence} from '../../../../../../data/model/absence/absence';
import {DatePipe} from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Child} from '../../../../../../data/model/accounts/child';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-find-absence',
  templateUrl: './find-absence.component.html',
  styleUrls: ['./find-absence.component.scss']
})
export class FindAbsenceComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public dataSource: MatTableDataSource<Absence> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['childName', 'date', 'reason', 'actions'];
  endDate: string;
  startDate: string;
  childName: string;
  children: Array<Child>;

  constructor(private datePipe: DatePipe, private absenceService: AbsenceService,
              private childService: ChildService) {
  }

  ngOnInit(): void {
    this.childService.getAllChildren().subscribe(resp => {
      this.children = resp;
    });
  }

  onSubmit(submittedForm) {
    this.getAllAbsencesBetweenDates(submittedForm.value.startDate, submittedForm.value.endDate);
    console.log(this.children);
  }

  removeAbsence(id: string): void {
    this.absenceService.deleteAbsence(id).subscribe(resp => {
      this.getAllAbsencesBetweenDates(this.startDate, this.endDate);
    });
  }

  getAllAbsencesBetweenDates(startDate: string, endDate: string) {
    this.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');
    this.absenceService.getAllAbsencesBetweenDates(this.startDate, this.endDate).subscribe(resp => {
      this.dataSource.data = resp;
      this.dataSource.sort = this.sort.toArray()[0];
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.paginator._intl.firstPageLabel = 'Ilość rekordów na stronę';
    });
  }

  getChildNameFromId(childId: string): string {
    console.log(this.children);
    this.children.forEach(child => {
        if (child.id === childId) {
          this.childName = child.name + ' ' + child.surname;
        }
      });
    return this.childName;
  }
}
