import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextInputModule } from './text-input/text-input.module';
import { FormsModule } from '@angular/forms';

import { DownloadAudioModule } from './download-audio/download-audio.module';
import { StreamAudioModule } from './stream-audio/stream-audio.module';
import { NgxsModule } from '@ngxs/store';
import { RootState } from './shared/state/root.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    TextInputModule,
    DownloadAudioModule,
    StreamAudioModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
