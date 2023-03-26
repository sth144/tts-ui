import { Injectable, StreamableFile } from '@nestjs/common';
import { execSync } from 'child_process';
import { join } from 'path';
import { createReadStream } from 'fs';
import { FilepathService } from 'shared/filepath/filepath.service';

@Injectable()
export class DownloadService {
  constructor(private filepathService: FilepathService) {}

  public getDownloadOptions(): string[] {
    const optionsRaw = execSync(
      `find ${join(process.cwd(), '../output/')} -type f -not -path '*/.*'`,
    )
      .toString()
      .split('\n');
    const options = optionsRaw.map((opt) => opt.split('output/')[1]);
    return options;
  }

  public getDownloadStream(downloadOption: string): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), `../output/${downloadOption}`),
    );
    return new StreamableFile(file);
  }

  public moveOrDeleteDownloadableFiles(changes: [string, string][]) {
    for (const change of changes) {
      if (change[1] !== null) {
        this.filepathService.moveFileWithinOutputDir(change[0], change[1]);
      } else if (change[1] === null) {
        this.filepathService.deleteFileWithinOutputDir(change[0]);
      }
    }
  }
}
