import { Component, OnInit } from '@angular/core';
import { DownloadAudioService } from 'src/app/download-audio/download-audio.service';
import { TextInputService } from '../../services/text-input.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  public title: string = '';
  public body: string = '';

  constructor(
    private textInputService: TextInputService,
    private downloadAudioService: DownloadAudioService
  ) {}

  ngOnInit(): void {}

  public submitTextInput(): void {
    this.textInputService.submitTextInput(this.title, this.body);
  }
}
