import { TestBed } from '@angular/core/testing';

import { SyncTargetService } from './sync-target.service';

describe('SyncTargetService', () => {
  let service: SyncTargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncTargetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
