import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MangerPaymentsComponent} from './manger-payments.component';

describe('PaymentsMenagerComponent', () => {
  let component: MangerPaymentsComponent;
  let fixture: ComponentFixture<MangerPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
