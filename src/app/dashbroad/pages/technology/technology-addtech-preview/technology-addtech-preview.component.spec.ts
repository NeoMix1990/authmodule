import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyAddtechPreviewComponent } from './technology-addtech-preview.component';

describe('TechnologyAddtechPreviewComponent', () => {
  let component: TechnologyAddtechPreviewComponent;
  let fixture: ComponentFixture<TechnologyAddtechPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologyAddtechPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyAddtechPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
