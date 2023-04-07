import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { ServerStateService } from '../../shared/state/state.service';
import { StateProperties } from 'tts-ui-lib';
import { FilepathService } from '../../shared/filepath/filepath.service';

@Injectable()
export class SyncTargetService {
  constructor(
    private filepathService: FilepathService,
    private serverStateService: ServerStateService,
  ) {}

  public get SyncTargetURL() {
    return this.serverStateService.valueFor(StateProperties.syncTargetURL);
  }

  public setSyncTargetURL(value) {
    this.serverStateService.dispatch(
      this.serverStateService.actionFor(StateProperties.syncTargetURL, value),
    );
  }

  public startSyncJob(): void {
    console.log(this.filepathService.getRelativeOutputPath('./'));
    execSync(
      `rsync -aP ${this.filepathService.getRelativeOutputPath(
        './',
      )} ${this.serverStateService.valueFor(StateProperties.syncTargetURL)}`,
    );
  }
}
