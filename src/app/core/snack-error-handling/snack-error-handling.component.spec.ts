import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SnackErrorHandlingComponent} from './snack-error-handling.component';

describe('SnackErrorHandlingComponent', () => {
  let component: SnackErrorHandlingComponent;
  let fixture: ComponentFixture<SnackErrorHandlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackErrorHandlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackErrorHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
