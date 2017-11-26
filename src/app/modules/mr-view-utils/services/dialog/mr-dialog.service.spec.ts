import {inject, TestBed} from "@angular/core/testing";

import {MrDialogService} from "./mr-dialog.service";

describe("MrDialogService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrDialogService]
    });
  });

  it("should be created", inject([MrDialogService], (service: MrDialogService) => {
    expect(service).toBeTruthy();
  }));
});
