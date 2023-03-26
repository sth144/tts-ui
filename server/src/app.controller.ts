import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO: use this for healthchecks?
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/webdav')
  async getWebDav(@Req() request: any, @Req() response: any) {}
}
