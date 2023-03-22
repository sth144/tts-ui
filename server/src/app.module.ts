import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { IngestModule } from 'ingest/ingest.module';
import { DownloadService } from './download/download.service';
import { DownloadModule } from './download/download.module';

export const serveStaticImport = ServeStaticModule.forRoot({
  rootPath:
    process.env.CLIENT_BUNDLE_DIR !== undefined
      ? process.env.CLIENT_BUNDLE_DIR
      : join(process.cwd(), '../client/dist/tts-ui-client/'),
  // exclude: ['/graphql'],
});

@Module({
  imports: [serveStaticImport, IngestModule, DownloadModule],
  controllers: [AppController],
  providers: [AppService, DownloadService],
})
export class AppModule {}

// TODO: GraphQL
// TODO: Redis
// TODO: Authentication
