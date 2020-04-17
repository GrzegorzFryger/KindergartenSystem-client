import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackMessageHandlingComponent} from './snack-message-handling.component';

@Injectable({
  providedIn: 'root'
})
export class SnackMessageHandlingService {
  // Configuration
  private readonly DURATION_IN_SECONDS = 5;

  // CSS classes
  private readonly RED_SNACKBAR = 'red-snackbar';
  private readonly YELLOW_SNACKBAR = 'yellow-snackbar';
  private readonly GREEN_SNACKBAR = 'green-snackbar';
  private readonly BLUE_SNACKBAR = 'blue-snackbar';

  constructor(private snackBar: MatSnackBar) {
  }

  public error(message: string): void {
    this.openSnackBar(message, this.RED_SNACKBAR);
  }

  public warning(message: string): void {
    this.openSnackBar(message, this.YELLOW_SNACKBAR);
  }

  public success(message: string): void {
    this.openSnackBar(message, this.GREEN_SNACKBAR);
  }

  public info(message: string): void {
    this.openSnackBar(message, this.BLUE_SNACKBAR);
  }

  private openSnackBar(message: string, className: string): void {
    this.snackBar.openFromComponent(SnackMessageHandlingComponent, {
      duration: this.DURATION_IN_SECONDS * 1000,
      data: message,
      panelClass: [className]
    });
  }
}

