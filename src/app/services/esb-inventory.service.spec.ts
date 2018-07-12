import { TestBed, inject } from '@angular/core/testing';

import { EsbInventoryService } from './esb-inventory.service';

describe('EsbInventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsbInventoryService]
    });
  });

  it('should be created', inject([EsbInventoryService], (service: EsbInventoryService) => {
    expect(service).toBeTruthy();
  }));
});
