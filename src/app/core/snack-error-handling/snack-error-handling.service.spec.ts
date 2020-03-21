import {TestBed} from '@angular/core/testing';

import {SnackErrorHandlingService} from './snack-error-handling.service';

describe('SnackErrorHandlingService', () => {
  let service: SnackErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
