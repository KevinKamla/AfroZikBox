import { TestBed } from '@angular/core/testing';

import { TendanceService } from './tendance.service';

describe('TendanceService', () => {
  let service: TendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
