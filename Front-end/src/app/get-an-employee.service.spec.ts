import { TestBed } from '@angular/core/testing';

import { GetAnEmployeeService } from './get-an-employee.service';

describe('GetAnEmployeeService', () => {
  let service: GetAnEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAnEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
