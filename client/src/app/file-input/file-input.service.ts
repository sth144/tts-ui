import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DownloadAudioService } from '../download-audio/download-audio.service';

@Injectable({
  providedIn: 'root',
})
export class FileInputService {
  constructor(
    private httpClient: HttpClient,
    private downloadAudioService: DownloadAudioService
  ) {}

  public uploadFilesForConversion(files: File[]) {
    // TODO: bulkify???
    for (const file of files as unknown as Array<File>) {
      const formData: FormData = new FormData();

      formData.append('file', file, file.name);
      formData.append(
        'filename',
        new Blob([file.name], { type: 'text/plain' }),
        'filename'
      );

      this.httpClient
        .post('/api/ingest/file-input', formData, { responseType: 'text' })
        .subscribe((res) => {
          // TODO: make sure we handle long write-times. We need to refresh options once file is written
          this.downloadAudioService.refreshOptions();
        });
    }
  }
}
