import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { execSync } from 'child_process';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('download')
export class DownloadController {
  // TODO: once authentication is integrated, only show options owned by user
  @Get('')
  private getDownloadOptions() {
    // TODO: move this to a service
    const optionsRaw = execSync(
      `find ${join(process.cwd(), '../output/')} -type f -not -path '*/.*'`,
    )
      .toString()
      .split('\n');
    const options = optionsRaw.map((opt) => opt.split('output/')[1]);
    return options;
  }

  // TODO: serve static
  @Get(':option')
  private downloadAudioFile(@Param('option') downloadOption: string) {
    console.log('downloadAudioFile ' + downloadOption);
    const file = createReadStream(
      join(process.cwd(), `../output/${downloadOption}`),
    );
    return new StreamableFile(file);
  }
}
