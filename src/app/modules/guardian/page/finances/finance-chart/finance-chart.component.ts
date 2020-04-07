import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color} from 'ng2-charts';

@Component({
  selector: 'app-finance-chart',
  templateUrl: './finance-chart.component.html',
  styleUrls: ['./finance-chart.component.scss']
})
export class FinanceChartComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @ViewChild('item') element: ElementRef;
  public chartHeight: any;

  public lineChartData: ChartDataSets[] = [
    {data: [0, 1500, 1400, 1800]}
  ];
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
      enabled: false
    },
    annotation: {},
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgb(130,177,234)',
      borderColor: 'rgb(240,187,218)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartType = 'line';


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.chartHeight = this.element.nativeElement.offsetHeight;
    console.log(this.element.nativeElement.offsetHeight);
  }

  ngAfterViewInit(): void {
    // this.chartHeight = this.element.nativeElement.offsetHeight;
    // console.log(this.element.nativeElement.offsetHeight);
  }

}
