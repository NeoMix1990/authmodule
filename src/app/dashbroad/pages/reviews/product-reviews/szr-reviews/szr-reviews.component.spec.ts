import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzrReviewsComponent } from './szr-reviews.component';

describe('SzrReviewsComponent', () => {
  let component: SzrReviewsComponent;
  let fixture: ComponentFixture<SzrReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzrReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzrReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
