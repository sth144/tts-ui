import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DownloadAudioService } from 'src/app/download-audio/download-audio.service';

@Injectable({
  providedIn: 'root',
})
export class TextInputService {
  constructor(
    private httpClient: HttpClient,
    private downloadAudioService: DownloadAudioService
  ) {}

  public submitTextInput(title: string, body: string) {
    // TODO: move this to service
    this.httpClient
      .post(
        '/api/ingest/text-input',
        {
          title: title,
          body: body,
        },
        {
          responseType: 'text',
        }
      )
      .subscribe((res) => {
        // TODO: make sure we handle long write-times. We need to refresh options once file is written
        this.downloadAudioService.refreshOptions();
      });
  }
}
