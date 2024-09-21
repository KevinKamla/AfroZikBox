import { TestBed } from '@angular/core/testing';

import { UserSessionServiveService } from './user-session-servive.service';

describe('UserSessionServiveService', () => {
  let service: UserSessionServiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSessionServiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
