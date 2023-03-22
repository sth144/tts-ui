import { TestBed } from '@angular/core/testing';

import { TextInputService } from './text-input.service';

describe('TextInputService', () => {
  let service: TextInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
