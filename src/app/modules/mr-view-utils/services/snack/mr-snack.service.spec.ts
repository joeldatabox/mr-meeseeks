import {inject, TestBed} from '@angular/core/testing';

import {MrSnackService} from './mr-snack.service';

describe('MrSnackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrSnackService]
    });
  });

  it('should be created', inject([MrSnackService], (service: MrSnackService) => {
    expect(service).toBeTruthy();
  }));
});
