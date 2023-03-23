import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TextInputService {
  constructor(private httpClient: HttpClient) {}

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
        console.log(res);
      });
  }
}
