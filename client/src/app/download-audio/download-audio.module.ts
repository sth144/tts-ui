import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadAudioComponent } from './components/download-audio/download-audio.component';
import { DownloadAudioService } from './services/download-audio.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DownloadAudioComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [DownloadAudioService],
  exports: [DownloadAudioComponent],
})
export class DownloadAudioModule {}
