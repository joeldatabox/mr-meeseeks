import {inject, TestBed} from '@angular/core/testing';

import {MrMetaService} from './mr-meta.service';

describe('MrMetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrMetaService]
    });
  });

  it('should be created', inject([MrMetaService], (service: MrMetaService) => {
    expect(service).toBeTruthy();
  }));
});
