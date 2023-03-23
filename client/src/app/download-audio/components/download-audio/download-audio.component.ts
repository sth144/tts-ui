import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RootState, RootStateModel } from 'src/app/state/root.state';
import { StreamAudioService } from 'src/app/stream-audio/stream-audio.service';
import { DownloadAudioService } from '../../download-audio.service';

@Component({
  selector: 'app-download-audio',
  templateUrl: './download-audio.component.html',
  styleUrls: ['./download-audio.component.css'],
})
export class DownloadAudioComponent implements OnInit {
  // TODO: use keys, not strings
  @Select(RootState.watch('downloadOptions'))
  public downloadOptions$: Observable<string[]>;

  public downloadOptions: string[] = [];
  public selectedOption: string | null = null;

  constructor(
    public downloadAudioService: DownloadAudioService,
    private streamAudioService: StreamAudioService
  ) {}

  async ngOnInit(): Promise<void> {
    this.downloadOptions = await this.downloadAudioService.getDownloadOptions();
  }

  public downloadOptionSelected(option: string): void {
    this.streamAudioService.setFileSource(option);

    this.downloadAudioService.setDownloadOption(option);

    this.selectedOption = option;
  }
}
