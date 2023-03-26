import { Body, Controller, Get, Post } from '@nestjs/common';
import { SyncTargetService } from './sync-target.service';

@Controller('sync-target')
export class SyncTargetController {
  constructor(private syncTargetService: SyncTargetService) {
    // TODO: load sync target URL from database
  }

  @Get()
  public getSyncTarget() {
    return this.syncTargetService.SyncTargetURL;
  }

  // TODO: authenticate and associate with user
  @Post()
  public postSyncTarget(@Body() requestBody) {
    console.log(requestBody);
    if ('target' in requestBody) {
      const targetURL = requestBody.target;
      this.syncTargetService.setSyncTargetURL(targetURL);
    }

    if ('initiateSync' in requestBody) {
      if (requestBody.initiateSync) {
        this.syncTargetService.startSyncJob();
      }
    }

    return this.syncTargetService.SyncTargetURL;
  }
}
