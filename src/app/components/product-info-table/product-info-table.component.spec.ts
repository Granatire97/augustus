import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoTableComponent } from './product-info-table.component';

describe('ProductInfoTableComponent', () => {
  let component: ProductInfoTableComponent;
  let fixture: ComponentFixture<ProductInfoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
