import {inject, TestBed} from "@angular/core/testing";

import {MrLoadingService} from "./mr-loading.service";

describe("MrLoadingService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrLoadingService]
    });
  });

  it("should be created", inject([MrLoadingService], (service: MrLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
