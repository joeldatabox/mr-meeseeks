import { TestBed } from '@angular/core/testing';

import { SrMaskService } from './sr-mask.service';

describe('SrMaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SrMaskService = TestBed.get(SrMaskService);
    expect(service).toBeTruthy();
  });
});
