import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { SyncTargetController } from './sync-target/sync-target.controller';
import { SyncTargetService } from './sync-target/sync-target.service';

@Module({
  imports: [SharedModule],
  controllers: [SyncTargetController],
  providers: [SyncTargetService],
})
export class SyncTargetModule {}
