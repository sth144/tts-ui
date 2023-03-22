import { Module } from '@nestjs/common';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';

@Module({
  imports: [],
  controllers: [IngestController],
  providers: [IngestService],
})
export class IngestModule {}
