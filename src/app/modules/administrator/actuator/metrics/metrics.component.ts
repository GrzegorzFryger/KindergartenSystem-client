import {Component, OnInit} from '@angular/core';
import {access} from 'fs';
import {ActuatorService} from '../../../../data/service/actuator/actuator-service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  names: [];

  constructor(private actuatorService: ActuatorService) {
  }

  ngOnInit(): void {
    this.actuatorService.getMetrics().subscribe(resp => {
      this.names = resp.names;
    });
  }

}
