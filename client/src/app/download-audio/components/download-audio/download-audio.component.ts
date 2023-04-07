import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../shared/state/root.state';
import { StreamAudioService } from 'src/app/stream-audio/stream-audio.service';
import {
  DownloadAudioService,
  DownloadOptionsMeta,
} from '../../download-audio.service';
import { StateProperties } from 'tts-ui-lib';

@Component({
  selector: 'app-download-audio',
  templateUrl: './download-audio.component.html',
  styleUrls: ['./download-audio.component.scss'],
})
export class DownloadAudioComponent implements OnInit {
  // TODO: use keys, not strings
  @Select(RootState.watch(StateProperties.downloadOptions))
  public downloadOptions$: Observable<string[]>;

  // TODO: migrate to downloadOptionsMeta for dirty, deleted, submit etc.
  public downloadOptionsMeta: DownloadOptionsMeta = {};

  public selectedOption: string | null = null;

  public mode: 'display' | 'editable' = 'display';

  constructor(
    public downloadAudioService: DownloadAudioService,
    private streamAudioService: StreamAudioService
  ) {}

  async ngOnInit(): Promise<void> {
    this.downloadOptions$.subscribe((options) => {
      this.populateDownloadOptionsMeta(options);
    });

    this.populateDownloadOptionsMeta(
      await this.downloadAudioService.getDownloadOptions()
    );
  }

  public downloadOptionSelected(option: string): void {
    this.streamAudioService.setFileSource(option);

    this.downloadAudioService.setDownloadOption(option);

    this.selectedOption = option;
  }

  public makeEditable() {
    this.mode = 'editable';
  }

  public optionEdited(option: string, event: Event) {
    // FIXME: this isn't working
    Object.assign(this.downloadOptionsMeta[option], {
      currentValue: (event as unknown as { target: { value: string } }).target
        .value,
      dirty: true,
    });
    // TODO: mark as dirty
  }
  private optionMarkedForDeletion(option: string) {
    // TODO: get this working
    Object.assign(this.downloadOptionsMeta[option], {
      currentValue: null,
      dirty: true,
    });
    // TODO: mark with tombstone
    // TODO: unmark option
  }

  public promptDelete(option: string) {
    // TODO: MatDialogRef modal prompt?
    this.optionMarkedForDeletion(option);
  }

  public unmarkOptionForDeletion(option: string) {
    this.downloadOptionsMeta[option].currentValue = option;
  }

  public cancelEdits() {
    this.mode = 'display';
  }
  public submitEdits() {
    // TODO: submit
    this.downloadAudioService
      .submitFilePathEdits(this.downloadOptionsMeta)
      .then(async () => {
        this.populateDownloadOptionsMeta(
          await this.downloadAudioService.getDownloadOptions()
        );
      });

    this.mode = 'display';
  }

  private populateDownloadOptionsMeta(downloadOptions: string[]) {
    this.downloadOptionsMeta = {};
    if (Array.isArray(downloadOptions)) {
      for (const option of downloadOptions) {
        if (option && option !== 'null') {
          this.downloadOptionsMeta[option] = {
            dirty: false,
            markedForDeletion: false,
            currentValue: option,
          };
        }
      }
    }
  }
}
