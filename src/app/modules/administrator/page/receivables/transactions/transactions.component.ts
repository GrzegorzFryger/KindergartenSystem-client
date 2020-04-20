import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ImportComponent} from './import/import.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  private isSelected: boolean;

  constructor(private router: Router,
              public dialog: MatDialog) {
    this.isSelected = true;
  }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      const navEnf = ev as NavigationEnd;
      this.isSelected = navEnf.url === '/administrator/transactions';
    });
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportComponent, {
      width: '900px',
     });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
