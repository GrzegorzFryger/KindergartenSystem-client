import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackErrorHandlingComponent} from './snack-error-handling.component';

@Injectable({
  providedIn: 'root'
})
export class SnackErrorHandlingService {
  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(errorMessage: string) {
    this.snackBar.openFromComponent(SnackErrorHandlingComponent, {
      duration: this.durationInSeconds * 1000, data: errorMessage
    });
  }
}

