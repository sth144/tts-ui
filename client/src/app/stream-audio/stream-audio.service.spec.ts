import { TestBed } from '@angular/core/testing';

import { StreamAudioService } from './stream-audio.service';

describe('StreamAudioService', () => {
  let service: StreamAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
