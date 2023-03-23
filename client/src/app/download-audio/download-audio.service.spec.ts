import { TestBed } from '@angular/core/testing';

import { DownloadAudioService } from './download-audio.service';

describe('DownloadAudioService', () => {
  let service: DownloadAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
