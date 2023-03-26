import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RootState, SetSyncTargetURL } from '../state/root.state';

@Injectable({
  providedIn: 'root',
})
export class SyncTargetService {
  @Select(RootState.watch('syncTargetURL'))
  public syncTargetURL$: Observable<string>;

  constructor(private httpClient: HttpClient, private store: Store) {}

  public submitSyncTargetURL(url: string) {
    this.httpClient
      .post('/api/sync-target', { target: url }, { responseType: 'text' })
      .subscribe((res) => {
        this.store.dispatch(new SetSyncTargetURL(res.toString()));
      });
  }

  public getSyncTargetURL() {
    this.httpClient.get('/api/sync-target').subscribe((res) => {
      console.log(res);
    });
  }

  public triggerSyncJob() {
    this.httpClient
      .post(
        '/api/sync-target',
        {
          initiateSync: true,
        },
        { responseType: 'text' }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
