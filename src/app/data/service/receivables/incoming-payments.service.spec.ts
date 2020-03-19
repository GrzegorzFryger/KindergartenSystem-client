import { TestBed } from '@angular/core/testing';

import { IncomingPaymentsService } from './incoming-payments.service';

describe('IncomingPaymentsService', () => {
  let service: IncomingPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomingPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
