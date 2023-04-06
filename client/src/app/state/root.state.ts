import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
// TODO: use a key instaead of just string
const ROOT_STATE_TOKEN = new StateToken<RootStateModel>('root');

// TODO: replace with prototype from lib
export interface RootStateModel {
  selectedOption: string | null;
  downloadOptions: string[] | null;
  syncTargetURL: string | null;
}

// TODO: break out actions into separate files
export class SetSelectedFileOption {
  static readonly type = 'SET_SELECTED_FILE_OPTION';
  constructor(public payload: string) {}
}

export class UpdateDownloadOptions {
  static readonly type = 'UPDATE_DOWNLOAD_OPTIONS';
  constructor(public payload: string[]) {}
}

export class ClearClientState {
  static readonly type = 'clear-client-state';
}

export class SetSyncTargetURL {
  static readonly type = 'SET_SYNC_TARGET_URL';
  constructor(public payload: string) {}
}

@State<RootStateModel>({
  name: ROOT_STATE_TOKEN,
  // TODO: prototype
  defaults: {
    selectedOption: null,
    downloadOptions: null,
    syncTargetURL: null,
  },
})
@Injectable()
export class RootState {
  constructor(/* NOTE: you can inject services here */) {}

  @Selector()
  public static watch(key: string, dotPath: string | null = null): object {
    return (state: { root: Record<string, unknown> }) => {
      const stateLocalSubstate: object = state.root[key] as object;

      if (dotPath !== null) {
        // TODO: handle dotpath?
      }
      return stateLocalSubstate;
    };
  }

  @Action(SetSelectedFileOption)
  setSelectedFileOption(
    ctx: StateContext<RootStateModel>,
    action: SetSelectedFileOption
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedOption: action.payload,
    });
  }

  @Action(UpdateDownloadOptions)
  setDownloadOptions(
    ctx: StateContext<RootStateModel>,
    action: UpdateDownloadOptions
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      downloadOptions: action.payload.filter(
        (item) => item !== null && item.length > 0
      ),
    });
  }

  @Action(SetSyncTargetURL)
  setSyncTargetURL(
    ctx: StateContext<RootStateModel>,
    action: SetSyncTargetURL
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      syncTargetURL: action.payload,
    });
  }
}
