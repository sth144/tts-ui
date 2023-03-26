import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { FilepathService } from 'shared/filepath/filepath.service';

@Injectable()
export class SyncTargetService {
  constructor(private filepathService: FilepathService) {}

  // TODO: load sync target URL from database
  private syncTargetURL: string = '';
  public get SyncTargetURL() {
    return this.syncTargetURL;
  }

  public setSyncTargetURL(value) {
    this.syncTargetURL = value;
  }

  public startSyncJob(): void {
    console.log(this.filepathService.getRelativeOutputPath('./'));
    execSync(
      `rsync -aP ${this.filepathService.getRelativeOutputPath('./')} ${
        this.syncTargetURL
      }`,
    );
  }
}
