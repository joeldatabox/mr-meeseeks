import {inject, TestBed} from "@angular/core/testing";

import {SrHttpService} from "./sr-http.service";

describe("SrHttpService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrHttpService]
    });
  });

  it("should be created", inject([SrHttpService], (service: SrHttpService) => {
    expect(service).toBeTruthy();
  }));
});
