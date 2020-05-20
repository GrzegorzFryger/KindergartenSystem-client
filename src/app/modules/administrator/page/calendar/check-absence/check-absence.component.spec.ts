import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAbsenceComponent } from './check-absence.component';

describe('CheckAbsenceComponent', () => {
  let component: CheckAbsenceComponent;
  let fixture: ComponentFixture<CheckAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
