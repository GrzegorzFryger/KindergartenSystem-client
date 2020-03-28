import { TestBed } from '@angular/core/testing';

import { SelectedChildService } from './selected-child.service';

describe('SelectedChildService', () => {
  let service: SelectedChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
