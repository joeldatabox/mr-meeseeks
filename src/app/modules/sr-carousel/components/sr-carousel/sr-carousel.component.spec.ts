import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrCarouselComponent } from './sr-carousel.component';

describe('SrCarouselComponent', () => {
  let component: SrCarouselComponent;
  let fixture: ComponentFixture<SrCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
