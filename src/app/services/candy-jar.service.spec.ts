import { TestBed, inject } from '@angular/core/testing';

import { CandyJarService } from './candy-jar.service';

describe('CandyJarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandyJarService]
    });
  });

  it('should be created', inject([CandyJarService], (service: CandyJarService) => {
    expect(service).toBeTruthy();
  }));
});
