import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrCarouselComponent } from './sr-carousel.component';

describe('CarouselComponent', () => {
  let component: SrCarouselComponent;
  let fixture: ComponentFixture<SrCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
