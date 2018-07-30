import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuBopisDisplayComponent } from './sku-bopis-display.component';

describe('SkuBopisDisplayComponent', () => {
  let component: SkuBopisDisplayComponent;
  let fixture: ComponentFixture<SkuBopisDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuBopisDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuBopisDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
