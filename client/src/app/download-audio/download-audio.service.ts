import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  RootState,
  RootStateModel,
  SetSelectedFileOption,
  UpdateDownloadOptions,
} from '../state/root.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadAudioService {
  @Select(RootState)
  public rootState$: Observable<RootStateModel>;

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
    // TODO: move this to service
    console.log(filename);
    this.httpClient
      .get(`/api/download/${encodeURI(filename)}`, { responseType: 'blob' })
      .subscribe((response: any) => {
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
}
