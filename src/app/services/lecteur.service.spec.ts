import { TestBed } from '@angular/core/testing';

import { LecteurService } from './lecteur.service';

describe('LecteurService', () => {
  let service: LecteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
