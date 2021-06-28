import { TestBed } from '@angular/core/testing';

import { SrQueryParamUtilsService } from './sr-query-param-utils.service';

describe('SrQueryParamUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SrQueryParamUtilsService = TestBed.get(SrQueryParamUtilsService);
    expect(service).toBeTruthy();
  });
});
