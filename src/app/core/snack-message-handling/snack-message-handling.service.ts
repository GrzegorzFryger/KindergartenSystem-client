import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackMessageHandlingComponent} from './snack-message-handling.component';

@Injectable({
  providedIn: 'root'
})
export class SnackMessageHandlingService {
  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) {}

  error(errorMessage: string) {
    this.snackBar.openFromComponent(SnackMessageHandlingComponent, {
      duration: this.durationInSeconds * 1000, data: errorMessage
    });
  }
}

