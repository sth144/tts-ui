import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { execSync } from 'child_process';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('download')
export class DownloadController {
  // TODO: once authentication is integrated, only show options owned by user
  @Get('')
  private getDownloadOptions() {
    const options = execSync(`ls ${join(process.cwd(), '../output/')}`)
      .toString()
      .split('\n');
    return options;
  }

  // TODO: serve static
  @Get(':option')
  private downloadAudioFile(@Param('option') downloadOption: string) {
    const file = createReadStream(
      join(process.cwd(), `../output/${downloadOption}`),
    );
    return new StreamableFile(file);
  }
}
