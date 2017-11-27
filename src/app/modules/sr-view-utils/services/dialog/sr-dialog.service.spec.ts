import {inject, TestBed} from "@angular/core/testing";

import {SrDialogService} from "./sr-dialog.service";

describe("SrDialogService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SrDialogService]
    });
  });

  it("should be created", inject([SrDialogService], (service: SrDialogService) => {
    expect(service).toBeTruthy();
  }));
});
