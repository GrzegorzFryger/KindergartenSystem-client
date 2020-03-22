import { TestBed } from '@angular/core/testing';

import { TransactionMappingService } from './transaction-mapping.service';

describe('TransactionMappingService', () => {
  let service: TransactionMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
