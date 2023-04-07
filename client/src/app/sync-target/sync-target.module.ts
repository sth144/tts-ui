import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncTargetComponent } from './components/sync-target/sync-target.component';
import { SyncTargetService } from './sync-target.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SyncTargetComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, SharedModule],
  providers: [SyncTargetService],
  exports: [SyncTargetComponent],
})
export class SyncTargetModule {}
