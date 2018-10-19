import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedsReviewPreviewComponent } from './seeds-review-preview.component';

describe('SeedsReviewPreviewComponent', () => {
  let component: SeedsReviewPreviewComponent;
  let fixture: ComponentFixture<SeedsReviewPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeedsReviewPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedsReviewPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
