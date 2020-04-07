import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-finance-chart',
  templateUrl: './finance-chart.component.html',
  styleUrls: ['./finance-chart.component.scss']
})
export class FinanceChartComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @ViewChild('item') element: ElementRef;
  public chartHeight: any;

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40] },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {

      xAxes: [{
        gridLines: {
          color: 'rgba(0, 0, 0, 0)'
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)'
          },
          ticks: {
            display: false
          }
        }
      ]
    },
    layout: {
      padding: {
        right: 8
      }
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true
    },
    annotation: {},
  };

  public lineChartColors: Color[] = [
    {
      // backgroundColor: 'rgb(130,177,234)',
      borderColor: 'rgb(240,187,218)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() {
    this.chartHeight = 50;
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    const sizeBox = this.element.nativeElement.offsetHeight;
    if (sizeBox !== this.chartHeight) {
      this.chartHeight = sizeBox;
    }
  }

  ngAfterViewInit(): void {
  }

}
