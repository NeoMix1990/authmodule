import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsReviewsComponent } from './contacts-reviews.component';

describe('ContactsReviewsComponent', () => {
  let component: ContactsReviewsComponent;
  let fixture: ComponentFixture<ContactsReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
