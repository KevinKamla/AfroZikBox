import { TestBed } from '@angular/core/testing';

import { ChansonsService } from './chansons.service';

describe('ChansonsService', () => {
  let service: ChansonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChansonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
