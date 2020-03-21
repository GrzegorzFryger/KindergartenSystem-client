import { TestBed } from '@angular/core/testing';

import { ImportPaymentsService } from './import-payments.service';

describe('ImportPaymentsService', () => {
  let service: ImportPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
