import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FileInputService } from './file-input.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FileInputComponent],

  imports: [CommonModule, HttpClientModule, FormsModule, SharedModule],
  providers: [FileInputService],
  exports: [FileInputComponent],
})
export class FileInputModule {}
