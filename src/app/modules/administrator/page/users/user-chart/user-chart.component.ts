import {Component, OnInit} from '@angular/core';
import {ChartType} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';
import {EmployeeService} from '../../../../../data/service/users/employee.service';
import {ChildService} from '../../../../../data/service/users/child.service';
import {GuardianService} from '../../../../../data/service/users/guardian.service';
import {zip} from 'rxjs';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss']
})
export class UserChartComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Rodzice', 'Dzieci', 'Pracownicy'];
  public doughnutChartData: MultiDataSet = [[0, 0, 0]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private  employeeService: EmployeeService, private guardianService: GuardianService, private childService: ChildService) {
  }

  ngOnInit(): void {
    zip(this.employeeService.getCountEmployee(), this.childService.getCountChildren(), this.guardianService.getCountGuardians())
      .subscribe(([employee, children, guardians]) => {
        this.doughnutChartData = [[guardians, children, employee]];
      });
  }

}
