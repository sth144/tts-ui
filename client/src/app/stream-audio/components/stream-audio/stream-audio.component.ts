import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DownloadAudioService } from 'src/app/download-audio/download-audio.service';
import { RootState } from 'src/app/shared/state/root.state';
import { StateProperties } from 'tts-ui-lib';
import { StreamAudioService } from '../../stream-audio.service';

@Component({
  selector: 'app-stream-audio',
  templateUrl: './stream-audio.component.html',
  styleUrls: ['./stream-audio.component.scss'],
})
export class StreamAudioComponent implements OnInit {
  @Select(RootState.watch(StateProperties.selectedOption))
  selectedOption$: Observable<string>;

  public displayFileURL: string = '';

  constructor(
    public streamAudioService: StreamAudioService,
    public downloadAudioService: DownloadAudioService
  ) {}

  ngOnInit(): void {
    this.selectedOption$.subscribe((opt) => {
      if (opt === null || opt.endsWith('download')) {
        this.displayFileURL = '';
      } else {
        this.displayFileURL = this.streamAudioService.FileSourceURL;
      }
    });
  }
}
