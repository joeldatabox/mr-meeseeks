import { TestBed } from '@angular/core/testing';

import { SrLocalStorageService } from './sr-local-storage.service';

describe('SrLocalStorageService', () => {
  let service: SrLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
