import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBrandPreviewComponent } from './contact-brand-preview.component';

describe('ContactBrandPreviewComponent', () => {
  let component: ContactBrandPreviewComponent;
  let fixture: ComponentFixture<ContactBrandPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactBrandPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactBrandPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
