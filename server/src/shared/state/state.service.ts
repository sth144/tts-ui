import { Injectable } from '@nestjs/common';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  ServerStatePrototype,
  ServerStateConfigBase,
  StateProperties,
  StateElementType,
} from 'tts-ui-lib';

export interface IAction<T = StateElementType> {
  type: string | StateProperties;
  payload: T;
  meta?: unknown;
}

@Injectable()
export class ServerStateService {
  private serverConfigPath: string = null;
  private serverStateConfig$: BehaviorSubject<ServerStateConfigBase> =
    new BehaviorSubject(ServerStatePrototype);

  constructor() {
    this.serverStateConfig$.next(this.getOrCreateConfigFile());
  }

  public dispatch(action: IAction<StateElementType>): void {
    // TODO: side effects?
    this.serverStateConfig$.next(
      Object.assign(this.serverStateConfig$.value, {
        [action.type]: action.payload,
      }),
    );
  }

  public actionFor(
    key: string | StateProperties,
    value: StateElementType,
  ): IAction {
    return {
      type: key,
      payload: value,
    };
  }

  public valueFor(key: StateProperties): StateElementType {
    return this.serverStateConfig$.value[key];
  }

  public streamFor(key: StateProperties): Subject<StateElementType> {
    let result: Subject<StateElementType> = new Subject();

    this.serverStateConfig$.subscribe((state) => {
      result.next(state[key]);
    });

    return result;
  }

  private getOrCreateConfigFile(): ServerStateConfigBase {
    let result = null;

    this.serverConfigPath =
      process.env.SERVER_CONFIG_PATH !== undefined
        ? process.env.SERVER_CONFIG_PATH
        : join(process.cwd(), '../config/state.config.json');

    if (existsSync(this.serverConfigPath)) {
      const loaded = require(this.serverConfigPath);

      const prototype = this.serverStateConfig$.value;

      result = Object.assign(prototype, loaded);
    } else {
      result = this.serverStateConfig$.value; // from prototype (see initialization)
      writeFileSync(this.serverConfigPath, JSON.stringify(result, null, 2));
    }

    return result;
  }
}
