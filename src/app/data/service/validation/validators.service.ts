import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

function check_if_is_integer(value) {
  return ((parseFloat(value) === parseInt(value, 10)) && !isNaN(value));

}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() {
  }

  public isInteger = (control: FormControl) => {
    return check_if_is_integer(control.value) ? null : {
      notNumeric: true
    };
  };
}
