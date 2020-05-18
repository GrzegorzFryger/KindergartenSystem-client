import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentsMenagerComponent} from './payments-menager.component';

describe('PaymentsMenagerComponent', () => {
  let component: PaymentsMenagerComponent;
  let fixture: ComponentFixture<PaymentsMenagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsMenagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsMenagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
