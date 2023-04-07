import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  RootState,
  SetSelectedFileOption,
  UpdateDownloadOptions,
} from '../shared/state/root.state';
import { Observable } from 'rxjs';
import { SessionStateConfigBase, SessionStatePrototype } from 'tts-ui-lib';

export type DownloadOptionMeta = {
  currentValue: string | null;
  dirty: boolean;
  markedForDeletion: boolean;
};

export interface DownloadOptionsMeta {
  [key: string]: DownloadOptionMeta;
}

@Injectable({
  providedIn: 'root',
})
export class DownloadAudioService {
  constructor(private httpClient: HttpClient, public store: Store) {}

  public async getDownloadOptions(): Promise<string[]> {
    return this.refreshOptions();
  }

  public async refreshOptions(): Promise<string[]> {
    const optionsAsync = new Promise<string[]>(async (resolve, rej) => {
      this.httpClient.get('/api/download/').subscribe((response) => {
        resolve(response as Array<string>);
      });
    });

    const options = await optionsAsync;

    this.store.dispatch(new UpdateDownloadOptions(options));

    return options;
  }

  public setDownloadOption(option: string): void {
    this.store.dispatch(new SetSelectedFileOption(option));
  }

  public downloadFile(filename: string): void {
    this.httpClient
      .get(`/api/download/${encodeURI(filename)}`, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (filename) downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  public async submitFilePathEdits(
    downloadOptions: DownloadOptionsMeta
  ): Promise<void> {
    const requestBody: Record<string, Partial<DownloadOptionMeta>> = {};
    for (const key in downloadOptions) {
      if (downloadOptions[key].dirty) {
        requestBody[key] = {
          currentValue: downloadOptions[key].currentValue,
        };
      }
      if (downloadOptions[key].markedForDeletion) {
        requestBody[key] = {
          currentValue: null,
        };
      }
    }
    // TODO: edit request body
    this.httpClient
      .patch('/api/download', requestBody)
      .subscribe((response) => {
        console.log(response);
      });
    return;
  }
}
