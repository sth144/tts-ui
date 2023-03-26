import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadAudioComponent } from './components/download-audio/download-audio.component';
import { DownloadAudioService } from './download-audio.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DownloadAudioComponent],
  imports: [SharedModule],
  providers: [DownloadAudioService],
  exports: [DownloadAudioComponent],
})
export class DownloadAudioModule {}
