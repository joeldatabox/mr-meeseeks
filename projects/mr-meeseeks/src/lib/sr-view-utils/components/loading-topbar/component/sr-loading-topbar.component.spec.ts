import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {SrLoadingTopbarComponent} from "./sr-loading-topbar.component";

describe("SrLoadingTopbarComponent", () => {
  let component: SrLoadingTopbarComponent;
  let fixture: ComponentFixture<SrLoadingTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SrLoadingTopbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrLoadingTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
