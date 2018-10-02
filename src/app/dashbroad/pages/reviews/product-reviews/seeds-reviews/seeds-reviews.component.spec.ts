import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedsReviewsComponent } from './seeds-reviews.component';

describe('SeedsReviewsComponent', () => {
  let component: SeedsReviewsComponent;
  let fixture: ComponentFixture<SeedsReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedsReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
