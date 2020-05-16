import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAbsenceComponent } from './find-absence.component';

describe('FindByDateComponent', () => {
  let component: FindAbsenceComponent;
  let fixture: ComponentFixture<FindAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
