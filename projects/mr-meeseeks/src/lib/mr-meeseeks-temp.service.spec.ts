import { TestBed } from '@angular/core/testing';

import { MrMeeseeksTempService } from './mr-meeseeks-temp.service';

describe('MrMeeseeksTempService', () => {
  let service: MrMeeseeksTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MrMeeseeksTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
