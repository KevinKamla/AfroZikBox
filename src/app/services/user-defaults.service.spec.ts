import { TestBed } from '@angular/core/testing';

import { UserDefaultsService } from './user-defaults.service';

describe('UserDefaultsService', () => {
  let service: UserDefaultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDefaultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
