import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeProtectComponent } from './scheme-protect.component';

describe('SchemeProtectComponent', () => {
  let component: SchemeProtectComponent;
  let fixture: ComponentFixture<SchemeProtectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeProtectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeProtectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
