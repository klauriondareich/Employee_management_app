import { TestBed } from '@angular/core/testing';

import { LoggInUserGuardService } from './logg-in-user-guard.service';

describe('LoggInUserGuardService', () => {
  let service: LoggInUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggInUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
