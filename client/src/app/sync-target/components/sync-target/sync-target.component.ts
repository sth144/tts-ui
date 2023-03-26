import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/state/root.state';
import { SyncTargetService } from '../../sync-target.service';

@Component({
  selector: 'app-sync-target',
  templateUrl: './sync-target.component.html',
  styleUrls: ['./sync-target.component.scss'],
})
export class SyncTargetComponent implements OnInit {
  @Select(RootState.watch('syncTargetURL'))
  public syncTargetURL$: Observable<string>;

  // TODO: break URL into components and hide behind a collapsible panel
  private syncTargetURLLocalStaged: string = '';

  constructor(private syncTargetService: SyncTargetService) {}

  ngOnInit(): void {}

  stageSyncTargetLocalURLLocal(event: Event) {
    this.syncTargetURLLocalStaged = (
      event.target as unknown as { value: string }
    ).value;
  }
  submitSyncTargetURL() {
    this.syncTargetService.submitSyncTargetURL(this.syncTargetURLLocalStaged);
  }
  public triggerSyncJob() {
    this.syncTargetService.triggerSyncJob();
  }
}
