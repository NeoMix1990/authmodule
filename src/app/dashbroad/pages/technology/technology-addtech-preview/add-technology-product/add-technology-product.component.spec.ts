import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnologyProductComponent } from './add-technology-product.component';

describe('AddTechnologyProductComponent', () => {
  let component: AddTechnologyProductComponent;
  let fixture: ComponentFixture<AddTechnologyProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTechnologyProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechnologyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
