import { Module } from '@nestjs/common';
import { FilepathService } from './filepath/filepath.service';

@Module({
  providers: [FilepathService],
  exports: [FilepathService],
})
export class SharedModule {}
