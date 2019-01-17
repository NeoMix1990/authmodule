import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPreviewComponent } from './manual-preview.component';

describe('ManualPreviewComponent', () => {
  let component: ManualPreviewComponent;
  let fixture: ComponentFixture<ManualPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
