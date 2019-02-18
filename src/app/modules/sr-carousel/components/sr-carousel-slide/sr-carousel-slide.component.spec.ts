import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrCarouselSlideComponent } from './sr-carousel-slide.component';

describe('SrCarouselSlideComponent', () => {
  let component: SrCarouselSlideComponent;
  let fixture: ComponentFixture<SrCarouselSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrCarouselSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrCarouselSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
