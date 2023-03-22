import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-audio',
  templateUrl: './download-audio.component.html',
  styleUrls: ['./download-audio.component.css'],
})
export class DownloadAudioComponent implements OnInit {
  public downloadOptions: string[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    // TODO: move this to service
    this.httpClient.get('/api/download/').subscribe((res) => {
      const resultArray = res as Array<string>;
      this.downloadOptions = resultArray;
    });
  }

  public downloadOption(option: string): void {
    // TODO: move this to service
    this.httpClient
      .get(`/api/download/${option}`, { responseType: 'blob' })
      .subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (option) downloadLink.setAttribute('download', option);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }
}
