import { Module } from '@nestjs/common';
import { FilepathService } from './filepath/filepath.service';
import { ServerStateService } from './state/state.service';

@Module({
  providers: [FilepathService, ServerStateService],
  exports: [FilepathService, ServerStateService],
})
export class SharedModule {}
