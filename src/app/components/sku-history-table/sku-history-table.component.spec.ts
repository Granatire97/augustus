import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuHistoryTableComponent } from './sku-history-table.component';

describe('SkuHistoryTableComponent', () => {
  let component: SkuHistoryTableComponent;
  let fixture: ComponentFixture<SkuHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
