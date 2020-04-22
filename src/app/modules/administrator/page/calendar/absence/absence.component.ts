import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbsenceService} from '../../../../../data/service/absence/absence.service';
import {Absence} from '../../../../../data/model/absence/absence';
import {DatePipe} from '@angular/common';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent implements OnInit {

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public dataSource: MatTableDataSource<Absence> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['childId', 'date', 'reason'];
  endDate: string;
  startDate: string;

  constructor(private datePipe: DatePipe, private absenceService: AbsenceService) {
  }

  ngOnInit(): void {
  }

  onSubmit(submittedForm) {
    this.startDate = this.datePipe.transform(submittedForm.value.startDate, 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(submittedForm.value.endDate, 'yyyy-MM-dd');
    this.absenceService.getAllAbsencesBetweenDates(this.startDate, this.endDate).subscribe(resp => {
      this.dataSource.data = resp;
      this.dataSource.sort = this.sort.toArray()[0];
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.paginator._intl.firstPageLabel = 'Ilość rekordów na stronę';
    });
  }

}
