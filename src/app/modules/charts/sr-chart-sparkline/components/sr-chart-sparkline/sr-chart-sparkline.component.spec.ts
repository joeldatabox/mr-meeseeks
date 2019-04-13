import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrChartSparklineComponent } from './sr-chart-sparkline.component';

describe('SrChartSparklineComponent', () => {
  let component: SrChartSparklineComponent;
  let fixture: ComponentFixture<SrChartSparklineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrChartSparklineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrChartSparklineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
