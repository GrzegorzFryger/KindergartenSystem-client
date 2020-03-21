import { TestBed } from '@angular/core/testing';

import { CashPaymentsService } from './cash-payments.service';

describe('CashPaymentsService', () => {
  let service: CashPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
