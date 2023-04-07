import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { DownloadController } from './download.controller';
import { DownloadService } from './download.service';

@Module({
  imports: [SharedModule],
  controllers: [DownloadController],
  providers: [DownloadService],
})
export class DownloadModule {}
