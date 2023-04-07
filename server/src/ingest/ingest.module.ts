import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';

@Module({
  imports: [SharedModule],
  controllers: [IngestController],
  providers: [IngestService],
})
export class IngestModule {}
