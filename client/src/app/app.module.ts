import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextInputModule } from './text-input/text-input.module';
import { FormsModule } from '@angular/forms';

import { DownloadAudioModule } from './download-audio/download-audio.module';
import { StreamAudioModule } from './stream-audio/stream-audio.module';
import { NgxsModule } from '@ngxs/store';
import { RootState } from './state/root.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextInputModule,
    DownloadAudioModule,
    StreamAudioModule,
    FormsModule,
    NgxsModule.forRoot([RootState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
