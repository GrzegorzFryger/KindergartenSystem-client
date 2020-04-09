import {Component, OnInit} from '@angular/core';
import {HttpTrace} from '../../../../data/model/actuator/http-trace';
import {ActuatorService} from '../../../../data/service/actuator/actuator-service';

@Component({
  selector: 'app-http-trace',
  templateUrl: './http-trace.component.html',
  styleUrls: ['./http-trace.component.scss']
})
export class HttpTraceComponent implements OnInit {

  httpTrace: HttpTrace;

  constructor(private actuatorService: ActuatorService) {
  }

  ngOnInit(): void {
    this.actuatorService.getHttpTrace().subscribe(resp => {
      this.httpTrace = resp;
    });
  }

}
