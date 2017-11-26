import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {MrLoadingTopbarComponent} from "./mr-loading-topbar.component";

describe("MrLoadingTopbarComponent", () => {
  let component: MrLoadingTopbarComponent;
  let fixture: ComponentFixture<MrLoadingTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MrLoadingTopbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrLoadingTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
