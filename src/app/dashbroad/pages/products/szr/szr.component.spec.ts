import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzrComponent } from './szr.component';

describe('SzrComponent', () => {
  let component: SzrComponent;
  let fixture: ComponentFixture<SzrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
