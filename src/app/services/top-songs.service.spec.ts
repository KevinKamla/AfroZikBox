import { TestBed } from '@angular/core/testing';

import { TopSongsService } from './top-songs.service';

describe('TopSongsService', () => {
  let service: TopSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
