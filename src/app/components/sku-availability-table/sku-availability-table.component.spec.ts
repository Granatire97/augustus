import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuAvailabilityTableComponent } from './sku-availability-table.component';

describe('SkuAvailabilityTableComponent', () => {
  let component: SkuAvailabilityTableComponent;
  let fixture: ComponentFixture<SkuAvailabilityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuAvailabilityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuAvailabilityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
