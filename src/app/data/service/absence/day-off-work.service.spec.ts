import {TestBed} from '@angular/core/testing';

import {DayOffWorkService} from './day-off-work.service';

describe('DayOffWorkService', () => {
  let service: DayOffWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayOffWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
