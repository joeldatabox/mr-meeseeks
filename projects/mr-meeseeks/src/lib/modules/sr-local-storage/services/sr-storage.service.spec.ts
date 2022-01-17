import {inject, TestBed} from "@angular/core/testing";
import {SrLocalStorageService} from "./sr-local-storage.service";


describe("SrLocalStorageService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrLocalStorageService]
    });
  });

  it("should be created", inject([SrLocalStorageService], (service: SrLocalStorageService) => {
    expect(service).toBeTruthy();
  }));
});
