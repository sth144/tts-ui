import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { DownloadService } from './download.service';

@Controller('download')
export class DownloadController {
  constructor(private downloadService: DownloadService) {}

  // TODO: once authentication is integrated, only show options owned by user
  @Get('')
  private getDownloadOptions() {
    return this.downloadService.getDownloadOptions();
  }

  @Get(':option')
  private downloadAudioFile(@Param('option') downloadOption: string) {
    return this.downloadService.getDownloadStream(downloadOption);
  }

  @Patch('')
  private patchDownloadOptions(@Body() requestBody) {
    const changes: [string, string][] = [];
    for (const fromFilepath in requestBody) {
      changes.push([fromFilepath, requestBody[fromFilepath].currentValue]);
    }
    this.downloadService.moveOrDeleteDownloadableFiles(changes);
    return this.downloadService.getDownloadOptions();
  }
}
