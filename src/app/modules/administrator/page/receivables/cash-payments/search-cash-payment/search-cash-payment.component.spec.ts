import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCashPaymentComponent } from './search-cash-payment.component';

describe('SearchCashPaymentComponent', () => {
  let component: SearchCashPaymentComponent;
  let fixture: ComponentFixture<SearchCashPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCashPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCashPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
