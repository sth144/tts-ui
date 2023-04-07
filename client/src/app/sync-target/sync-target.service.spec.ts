import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';

import { SyncTargetService } from './sync-target.service';

describe('SyncTargetService', () => {
  let service: SyncTargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient, Store],
    });
    service = TestBed.inject(SyncTargetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
