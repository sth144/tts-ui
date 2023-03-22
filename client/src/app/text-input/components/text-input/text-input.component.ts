import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  public title: string = '';
  public body: string = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  public submitTextInput(): void {
    // TODO: move this to service
    this.httpClient
      .post(
        '/api/ingest/text-input',
        {
          title: this.title,
          body: this.body,
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
