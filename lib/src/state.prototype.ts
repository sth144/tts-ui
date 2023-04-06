// TODO: export as npm package, install in client and server, integrate into state management

export enum StateProperties {
  selectedOption = "SELECTED_OPTION",
  downloadOptions = "DOWNLOAD_OPTIONS",
  syncTargetURL = "SYNC_TARGET_URL",
}

export type StateElementType = string | number | boolean | null | string[];

export interface IStateProperty<T = StateElementType> {
  defaultValue: T;
}

type StateConfigDict = {
  [property in StateProperties]: IStateProperty<StateElementType>;
};

/**
 * used to enforce types
 */
export class StateConfigBase implements StateConfigDict {
  [StateProperties.selectedOption]: IStateProperty<string | null>;
  [StateProperties.downloadOptions]: IStateProperty<string[] | null>;
  [StateProperties.syncTargetURL]: IStateProperty<string | null>;
}

export const StatePrototype: StateConfigBase = {
  [StateProperties.selectedOption]: null,
  [StateProperties.downloadOptions]: null,
  [StateProperties.syncTargetURL]: null,
};

export interface IStateElementConfig<Key extends StateProperties>
  extends IStateProperty<StateConfigBase[Key]["defaultValue"]> {
  key: Key;
}

export class StateElement<Key extends StateProperties>
  implements IStateElementConfig<Key>
{
  readonly _key: Key;
  public get key(): Key {
    return this._key;
  }

  private _defaultValue: StateConfigBase[Key]["defaultValue"];
  public get defaultValue(): StateConfigBase[Key]["defaultValue"] {
    return this._defaultValue;
  }
}

export type IStateElementCollection = {
  [key in StateProperties]: StateElement<key>;
};
