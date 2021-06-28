import {inject, TestBed} from "@angular/core/testing";

import {SrLoadingTopbarService} from "./sr-loading-topbar.service";

describe("SrLoadingTopbarService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrLoadingTopbarService]
    });
  });

  it("should be created", inject([SrLoadingTopbarService], (service: SrLoadingTopbarService) => {
    expect(service).toBeTruthy();
  }));
});
