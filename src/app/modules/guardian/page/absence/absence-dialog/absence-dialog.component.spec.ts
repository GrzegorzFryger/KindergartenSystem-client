import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AbsenceDialogComponent} from './absence-dialog.component';

describe('AbsenceDialogComponent', () => {
  let component: AbsenceDialogComponent;
  let fixture: ComponentFixture<AbsenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
