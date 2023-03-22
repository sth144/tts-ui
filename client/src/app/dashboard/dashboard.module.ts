import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TextInputModule } from '../text-input/text-input.module';
import { DownloadAudioModule } from '../download-audio/download-audio.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    TextInputModule,
    DownloadAudioModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
