import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { InitializeSessionState, RootState } from './root.state';
import { SessionStatePrototype, StateProperties } from 'tts-ui-lib';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private store: Store) {
    this.store.dispatch(new InitializeSessionState(SessionStatePrototype));
  }
}
