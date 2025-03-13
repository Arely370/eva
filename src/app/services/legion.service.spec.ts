import { TestBed } from '@angular/core/testing';

import { LegionService } from './legion.service';

describe('LegionService', () => {
  let service: LegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
