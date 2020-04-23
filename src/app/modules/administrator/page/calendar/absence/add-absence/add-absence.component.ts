import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Child} from '../../../../../../data/model/accounts/child';
import {ChildService} from '../../../../../../data/service/accounts/child.service';
import {Absence} from '../../../../../../data/model/absence/absence';
import {AbsenceService} from '../../../../../../data/service/absence/absence.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.scss']
})
export class AddAbsenceComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSourceChild: MatTableDataSource<Child> = new MatTableDataSource();

  public columnsToDisplay: string[] = ['name', 'surname', 'pesel'];

  private children: Observable<Array<Child>>;

  constructor(private childService: ChildService, private absenceService: AbsenceService) {
    this.children = this.childService.getAllChildren();
  }

  ngOnInit(): void {
    this.children.subscribe(children => {
      this.dataSourceChild.data = children;
      this.dataSourceChild.sort = this.sort;
      this.dataSourceChild.paginator = this.paginator;
      this.dataSourceChild.paginator._intl.itemsPerPageLabel = 'Ilość rekordów na stronę';
    });
  }

}
