import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorComponent} from './error/error.component';
import {ComponentType} from '@angular/cdk/overlay';
import {WarningComponent} from './warning/warning.component';
import {SuccessComponent} from './success/success.component';
import {InfoComponent} from './info/info.component';

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
    this.openSnackBar(ErrorComponent, message, this.RED_SNACKBAR);
  }

  public warning(message: string): void {
    this.openSnackBar(WarningComponent, message, this.YELLOW_SNACKBAR);
  }

  public success(message: string): void {
    this.openSnackBar(SuccessComponent, message, this.GREEN_SNACKBAR);
  }

  public info(message: string): void {
    this.openSnackBar(InfoComponent, message, this.BLUE_SNACKBAR);
  }

  private openSnackBar(component: ComponentType<any>, message: string, backgroundColorClass: string): void {
    this.snackBar.openFromComponent(component, {
      duration: this.DURATION_IN_SECONDS * 1000,
      data: message,
      panelClass: [backgroundColorClass]
    });
  }
}

