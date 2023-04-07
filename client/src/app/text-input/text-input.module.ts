import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextInputService } from './services/text-input.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TextInputComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, SharedModule],
  providers: [TextInputService],
  exports: [TextInputComponent],
})
export class TextInputModule {}
