import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsBrandsComponent } from './contacts-brands.component';

describe('ContactsBrandsComponent', () => {
  let component: ContactsBrandsComponent;
  let fixture: ComponentFixture<ContactsBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
