import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Guardian} from '../../../../../data/model/users/guardian';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountCreatorComponent implements OnInit {
  personFormInitial: Guardian;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  favoriteSeason: string;
  seasons: string[] = ['Rodzic', 'Dziecko', 'Pracownik'];

  constructor(private formBuilder: FormBuilder) {
    this.personFormInitial = new Guardian();
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  formValuesChange($event: { [p: string]: any }) {

  }

  close(person: string) {

  }

  onSubmit() {

  }

  radioChange($event: MatRadioChange) {
    console.log($event);
  }
}
