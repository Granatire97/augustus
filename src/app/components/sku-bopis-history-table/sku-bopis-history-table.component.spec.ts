import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuBopisHistoryTableComponent } from './sku-bopis-history-table.component';

describe('SkuBopisHistoryTableComponent', () => {
  let component: SkuBopisHistoryTableComponent;
  let fixture: ComponentFixture<SkuBopisHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuBopisHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuBopisHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
