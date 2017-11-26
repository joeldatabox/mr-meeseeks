import { TestBed, inject } from '@angular/core/testing';

import { MrStorageService } from './mr-storage.service';

describe('MrStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrStorageService]
    });
  });

  it('should be created', inject([MrStorageService], (service: MrStorageService) => {
    expect(service).toBeTruthy();
  }));
});
