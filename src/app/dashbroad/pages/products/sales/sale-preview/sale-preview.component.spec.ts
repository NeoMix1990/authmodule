import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePreviewComponent } from './sale-preview.component';

describe('SalePreviewComponent', () => {
  let component: SalePreviewComponent;
  let fixture: ComponentFixture<SalePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
