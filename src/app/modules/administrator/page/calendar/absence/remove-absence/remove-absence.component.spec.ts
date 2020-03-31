import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAbsenceComponent } from './remove-absence.component';

describe('RemoveAbsenceComponent', () => {
  let component: RemoveAbsenceComponent;
  let fixture: ComponentFixture<RemoveAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
