// TODO: export as npm package, install in client and server, integrate into state management

export enum StateProperties {
  selectedOption = "SELECTED_OPTION",
  downloadOptions = "DOWNLOAD_OPTIONS",
  syncTargetURL = "SYNC_TARGET_URL",
}

export type StateElementType = string | number | boolean | null | string[];

type StateConfigDict = {
  [property in StateProperties]: StateElementType;
};

/**
 * used to enforce types
 */
export class ServerStateConfigBase implements Partial<StateConfigDict> {
  [StateProperties.downloadOptions]: string[] | null;
  [StateProperties.syncTargetURL]: string | null;
}
export const ServerStatePrototype: ServerStateConfigBase = {
  [StateProperties.downloadOptions]: [],
  [StateProperties.syncTargetURL]:
    "sthinds@openmediavault.local:/home/sthinds/data/Audio",
};

export class SessionStateConfigBase
  extends ServerStateConfigBase
  implements StateConfigDict
{
  [StateProperties.selectedOption]: string | null;
}
export interface ISessionStateConfigBase extends SessionStateConfigBase {}

export const SessionStatePrototype: SessionStateConfigBase = {
  [StateProperties.selectedOption]: null,
  ...ServerStatePrototype,
};
