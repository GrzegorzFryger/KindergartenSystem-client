import {Component, OnInit} from '@angular/core';
import {access} from 'fs';
import {ActuatorService} from '../../../../../data/service/actuator/actuator-service';
import {Metric} from '../../../../../data/model/actuator/metric';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  names: [];
  presentingMetrics: Metric;

  constructor(private actuatorService: ActuatorService) {
  }

  ngOnInit(): void {
    this.actuatorService.getMetrics().subscribe(resp => {
      this.names = resp.names;
    });
  }

  getMetricsDetails(i: string) {
    this.actuatorService.getMetricsDetails(i).subscribe(resp => {
      this.presentingMetrics = resp;
    });
  }
}
