import {inject, TestBed} from '@angular/core/testing';

import {SrSnackService} from './sr-snack.service';

describe('SrSnackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrSnackService]
    });
  });

  it('should be created', inject([SrSnackService], (service: SrSnackService) => {
    expect(service).toBeTruthy();
  }));
});
