import {Component, OnInit} from '@angular/core';
import {ChartType} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';
import {EmployeeService} from '../../../../../data/service/accounts/employee.service';
import {ChildService} from '../../../../../data/service/accounts/child.service';
import {GuardianService} from '../../../../../data/service/accounts/guardian.service';
import {zip} from 'rxjs';

@Component({
  selector: 'app-account-chart',
  templateUrl: './account-chart.component.html',
  styleUrls: ['./account-chart.component.scss']
})
export class AccountChartComponent implements OnInit {

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
