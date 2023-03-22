import { Module } from '@nestjs/common';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';

@Module({
  imports: [],
  controllers: [DownloadController],
  providers: [DownloadService],
})
export class DownloadModule {}
