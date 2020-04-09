import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Output() personEmitter: EventEmitter<boolean>;
  @Input() person: any;

  constructor() {
    this.personEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  closePersonComponent() {
    this.personEmitter.emit(false);
  }

}
