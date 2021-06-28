import {inject, TestBed} from "@angular/core/testing";

import {SrLoadingService} from "./sr-loading.service";

describe("SrLoadingService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrLoadingService]
    });
  });

  it("should be created", inject([SrLoadingService], (service: SrLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
