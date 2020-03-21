import {TestBed} from '@angular/core/testing';

import {ErrorAuthInterceptor} from './error-auth.interceptor';

describe('ErrorAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorAuthInterceptor = TestBed.inject(ErrorAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
