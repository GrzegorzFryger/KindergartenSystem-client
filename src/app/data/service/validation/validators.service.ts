import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

function check_if_is_double(value) {
  const regex = /^\d+(?:,\d{1,2})$/; // Any number with 2 decimal places
  return regex.test(value);
}

function check_if_is_integer(value) {
  return ((parseFloat(value) === parseInt(value, 10)) && !isNaN(value));
}

function check_if_is_correct_number(value) {
  if (value.includes('.')) {
    return false;
  } else {
    return check_if_is_double(value) || check_if_is_integer(value);
  }
}

function check_if_is_correct_text(value) {
  const regex = /^[A-Za-z\s\-]+$/; // a-Z letters, space, dash
  return regex.test(value);
}

function check_if_is_correct_text_with_numbers(value) {
  const regex = /^[0-9A-Za-z\s\-]+$/; // 0-9 numbers, a-Z letters, space, dash
  return regex.test(value);
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

  public isCorrectText = (control: FormControl) => {
    return check_if_is_correct_text(control.value) ? null : {
      notCorrectText: true
    };
  }

  public isCorrectTextWithNumbers = (control: FormControl) => {
    return check_if_is_correct_text_with_numbers(control.value) ? null : {
      notCorrectTextWithNumbers: true
    };
  }
}
