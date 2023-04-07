import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import {
  ISessionStateConfigBase,
  StateProperties,
  SessionStatePrototype,
} from 'tts-ui-lib';

const ROOT_STATE_TOKEN = new StateToken<ISessionStateConfigBase>('root');

// TODO: break out actions into separate files
export class SetSelectedFileOption {
  static readonly type = 'SET_SELECTED_FILE_OPTION';
  constructor(public payload: string | null) {}
}

export class UpdateDownloadOptions {
  static readonly type = 'UPDATE_DOWNLOAD_OPTIONS';
  constructor(public payload: string[] | null) {}
}

export class ClearClientState {
  static readonly type = 'CLEAR_CLIENT_STATE';
}

export class SetSyncTargetURL {
  static readonly type = 'SET_SYNC_TARGET_URL';
  constructor(public payload: string | null) {}
}
export class InitializeSessionState {
  static readonly type = 'INITIALIZE_SESSION_STATE';
  constructor(public payload: ISessionStateConfigBase) {}
}

@State<ISessionStateConfigBase>({
  name: ROOT_STATE_TOKEN,
  defaults: SessionStatePrototype,
})
@Injectable()
export class RootState {
  constructor(/* NOTE: you can inject services here */) {
    console.log('New RootState');
  }

  @Selector()
  public static watch(
    key: StateProperties | null = null,
    dotPath: string | null = null
  ): object {
    return (state: { root: ISessionStateConfigBase }) => {
      let result;
      if (key === null) {
        result = state;
      } else {
        const stateLocalSubstate: object = state.root[key] as object;

        if (dotPath !== null) {
          // TODO: handle dotpath?
        }

        result = stateLocalSubstate;
      }
      return result;
    };
  }

  @Action(SetSelectedFileOption)
  setSelectedFileOption(
    ctx: StateContext<ISessionStateConfigBase>,
    action: SetSelectedFileOption
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      [StateProperties.selectedOption]: action.payload,
    });
  }

  @Action(UpdateDownloadOptions)
  setDownloadOptions(
    ctx: StateContext<ISessionStateConfigBase>,
    action: UpdateDownloadOptions
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      [StateProperties.downloadOptions]: (action.payload as string[]).filter(
        (item) => item !== null && item.length > 0
      ),
    });
  }

  @Action(SetSyncTargetURL)
  setSyncTargetURL(
    ctx: StateContext<ISessionStateConfigBase>,
    action: SetSyncTargetURL
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      [StateProperties.syncTargetURL]: action.payload,
    });
  }

  @Action(InitializeSessionState)
  public initializeSessionState(
    ctx: StateContext<ISessionStateConfigBase>,
    init: InitializeSessionState
  ): void {
    ctx.setState(init.payload as ISessionStateConfigBase);
  }
}
