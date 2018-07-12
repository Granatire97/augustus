import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuEsbLiveCountComponent } from './sku-esb-live-count.component';

describe('SkuEsbLiveCountComponent', () => {
  let component: SkuEsbLiveCountComponent;
  let fixture: ComponentFixture<SkuEsbLiveCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuEsbLiveCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuEsbLiveCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
