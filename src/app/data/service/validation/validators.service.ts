import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

function check_if_is_double(value) {
  const regex = /^\d+(?:\.\d{0,2})$/; // Any number with 2 decimal places
  return regex.test(value);
}

function check_if_is_integer(value) {
  return ((parseFloat(value) === parseInt(value, 10)) && !isNaN(value));
}

function check_if_is_correct_number(value) {
  return check_if_is_double(value) || check_if_is_integer(value);
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() {
  }

  public isCorrectNumber = (control: FormControl) => {
    return check_if_is_correct_number(control.value) ? null : {
      notNumeric: true
    };
  }
}
