import { TestBed, inject } from '@angular/core/testing';

import { SrLocatorService } from './sr-locator.service';

describe('SrLocatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrLocatorService]
    });
  });

  it('should be created', inject([SrLocatorService], (service: SrLocatorService) => {
    expect(service).toBeTruthy();
  }));
});
