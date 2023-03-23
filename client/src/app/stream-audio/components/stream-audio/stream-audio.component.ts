import { Component, OnInit } from '@angular/core';
import { DownloadAudioService } from 'src/app/download-audio/download-audio.service';
import { StreamAudioService } from '../../stream-audio.service';

@Component({
  selector: 'app-stream-audio',
  templateUrl: './stream-audio.component.html',
  styleUrls: ['./stream-audio.component.css'],
})
export class StreamAudioComponent implements OnInit {
  constructor(
    public streamAudioService: StreamAudioService,
    public downloadAudioService: DownloadAudioService
  ) {}

  ngOnInit(): void {}
}
