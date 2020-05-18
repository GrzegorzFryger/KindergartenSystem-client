import {TestBed} from '@angular/core/testing';

import {DiscountPaymentService} from './discount-payment.service';

describe('DiscountPaymentService', () => {
  let service: DiscountPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
