import {inject, TestBed} from "@angular/core/testing";

import {MrLoadingTopbarService} from "./mr-loading-topbar.service";

describe("MrLoadingTopbarService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrLoadingTopbarService]
    });
  });

  it("should be created", inject([MrLoadingTopbarService], (service: MrLoadingTopbarService) => {
    expect(service).toBeTruthy();
  }));
});
