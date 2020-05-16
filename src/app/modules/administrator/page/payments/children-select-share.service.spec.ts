import {TestBed} from '@angular/core/testing';

import {ChildrenSelectShareService} from './children-select-share.service';

describe('ChildrenSelectShareService', () => {
  let service: ChildrenSelectShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildrenSelectShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
