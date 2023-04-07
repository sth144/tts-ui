import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamAudioComponent } from './components/stream-audio/stream-audio.component';
import { StreamAudioService } from './stream-audio.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StreamAudioComponent],
  imports: [CommonModule, SharedModule],
  providers: [StreamAudioService],
  exports: [StreamAudioComponent],
})
export class StreamAudioModule {}
