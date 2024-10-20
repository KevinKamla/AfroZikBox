import { TestBed } from '@angular/core/testing';

import { VService } from './v.service';

describe('VService', () => {
  let service: VService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
