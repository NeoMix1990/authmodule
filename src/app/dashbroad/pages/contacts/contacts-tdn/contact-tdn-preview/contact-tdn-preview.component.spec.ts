import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTdnPreviewComponent } from './contact-tdn-preview.component';

describe('ContactTdnPreviewComponent', () => {
  let component: ContactTdnPreviewComponent;
  let fixture: ComponentFixture<ContactTdnPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTdnPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTdnPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
