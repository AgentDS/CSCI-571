import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsTabComponent } from './reviews-tab.component';

describe('ReviewsTabComponent', () => {
  let component: ReviewsTabComponent;
  let fixture: ComponentFixture<ReviewsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
