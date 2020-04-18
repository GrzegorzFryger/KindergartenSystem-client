import {Component, OnInit} from '@angular/core';
import {ActuatorService} from '../../../../../data/service/actuator/actuator-service';
import { Chart } from 'chart.js';
import {HttpTrace} from '../../../../../data/model/actuator/http-trace';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  chart: Chart;
  trace: HttpTrace;
  data: [20, 10];
  times = [];
  timeStamps = [];

  constructor(private actuatorService: ActuatorService,
              public datapipe: DatePipe) {
  }

  ngOnInit(): void {
    this.actuatorService.getHttpTrace().subscribe(resp => {
      this.trace = resp;
      this.times = this.trace.traces.map(res => res.timeTaken);
      this.timeStamps = this.trace.traces.map(res => this.datapipe.transform(res.timestamp, 'h:mm a'));
      this.createChart();
    });
  }

  createChart() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.timeStamps,
        datasets: [
          {
            data: this.times,
            borderColor: '#BEC9F4',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

  }


}
