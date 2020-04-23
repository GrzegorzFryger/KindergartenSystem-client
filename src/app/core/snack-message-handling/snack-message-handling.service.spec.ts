import {TestBed} from '@angular/core/testing';

import {SnackMessageHandlingService} from './snack-message-handling.service';

describe('SnackErrorHandlingService', () => {
  let service: SnackMessageHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackMessageHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
