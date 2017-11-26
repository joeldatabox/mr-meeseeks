import { TestBed, inject } from '@angular/core/testing';

import { MrHttpService } from './mr-http.service';

describe('MrHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrHttpService]
    });
  });

  it('should be created', inject([MrHttpService], (service: MrHttpService) => {
    expect(service).toBeTruthy();
  }));
});
