import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TextInputModule } from '../text-input/text-input.module';
import { FileInputModule } from '../file-input/file-input.module';
import { DownloadAudioModule } from '../download-audio/download-audio.module';
import { StreamAudioModule } from '../stream-audio/stream-audio.module';
import { SyncTargetModule } from '../sync-target/sync-target.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    TextInputModule,
    FileInputModule,
    DownloadAudioModule,
    StreamAudioModule,
    SyncTargetModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
