import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsTDNComponent } from './contacts-tdn.component';

describe('ContactsTDNComponent', () => {
  let component: ContactsTDNComponent;
  let fixture: ComponentFixture<ContactsTDNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsTDNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsTDNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
