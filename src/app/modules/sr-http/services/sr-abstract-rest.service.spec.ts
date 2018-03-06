import {inject, TestBed} from '@angular/core/testing';

import {SrAbstractRestService} from './sr-abstract-rest.service';

describe('SrAbstractRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrAbstractRestService]
    });
  });

  it('should be created', inject([SrAbstractRestService], (service: SrAbstractRestService) => {
    expect(service).toBeTruthy();
  }));
});
