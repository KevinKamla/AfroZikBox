import { TestBed } from '@angular/core/testing';

import { AdsUploadService } from './ads-upload.service';

describe('AdsUploadService', () => {
  let service: AdsUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdsUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
