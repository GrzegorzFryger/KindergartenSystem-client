import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDayOffDialogComponent } from './add-day-off-dialog.component';

describe('AddDayOffDialogComponent', () => {
  let component: AddDayOffDialogComponent;
  let fixture: ComponentFixture<AddDayOffDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDayOffDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDayOffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
