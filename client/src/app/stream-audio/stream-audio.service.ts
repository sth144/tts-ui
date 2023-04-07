import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StreamAudioService {
  // TODO: move this to it's own service
  public get FileSourceURL() {
    return this.fileSourceURL;
  }
  private fileSourceURL = `${window.location.href}/api/download`;
  constructor() {}

  public setFileSource(fileSourceName: string): void {
    this.fileSourceURL = `${
      window.location.href
    }api/download/${encodeURIComponent(fileSourceName)}`;
  }
}
