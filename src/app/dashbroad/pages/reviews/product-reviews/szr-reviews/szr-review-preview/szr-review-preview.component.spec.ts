import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzrReviewPreviewComponent } from './szr-review-preview.component';

describe('SzrReviewPreviewComponent', () => {
  let component: SzrReviewPreviewComponent;
  let fixture: ComponentFixture<SzrReviewPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzrReviewPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzrReviewPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
