import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SzrPreviewComponent } from './szr-preview.component';

describe('SzrPreviewComponent', () => {
  let component: SzrPreviewComponent;
  let fixture: ComponentFixture<SzrPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SzrPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SzrPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
