import { TestBed } from '@angular/core/testing';

import { LatestSongsService } from './latest-songs.service';

describe('LatestSongsService', () => {
  let service: LatestSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
