import {inject, TestBed} from '@angular/core/testing';

import {SrMetaService} from './sr-meta.service';

describe('SrMetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrMetaService]
    });
  });

  it('should be created', inject([SrMetaService], (service: SrMetaService) => {
    expect(service).toBeTruthy();
  }));
});
