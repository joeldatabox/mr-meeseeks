import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrMeeseeksTempComponent } from './mr-meeseeks-temp.component';

describe('MrMeeseeksTempComponent', () => {
  let component: MrMeeseeksTempComponent;
  let fixture: ComponentFixture<MrMeeseeksTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrMeeseeksTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MrMeeseeksTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
