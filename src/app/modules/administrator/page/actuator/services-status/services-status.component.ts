import {Component, OnInit} from '@angular/core';
import {Health} from '../../../../../data/model/actuator/health';
import {ActuatorService} from '../../../../../data/service/actuator/actuator-service';

@Component({
  selector: 'app-services-status',
  templateUrl: './services-status.component.html',
  styleUrls: ['./services-status.component.scss']
})
export class ServicesStatusComponent implements OnInit {
  health: Health;

  constructor(private actuatorService: ActuatorService) {
  }

  ngOnInit(): void {
    this.actuatorService.getHealth().subscribe(resp => {
      this.health = resp;
    });
  }

}
