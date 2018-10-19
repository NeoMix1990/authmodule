import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactReviewsPreviewComponent } from './contact-reviews-preview.component';

describe('ContactReviewsPreviewComponent', () => {
  let component: ContactReviewsPreviewComponent;
  let fixture: ComponentFixture<ContactReviewsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactReviewsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactReviewsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
