import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbsenceForChildDialogComponent } from './add-absence-for-child-dialog.component';

describe('AddAbsenceForChildComponent', () => {
  let component: AddAbsenceForChildDialogComponent;
  let fixture: ComponentFixture<AddAbsenceForChildDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAbsenceForChildDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbsenceForChildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
