import { Cookie } from 'electron';
import { OAuth2Authorization } from '@advanced-rest-client/electron-oauth2';

/**
 * Configuration for an application config option.
 */
export declare interface ApplicationOption {
  name: string;
  shortcut?: string;
  type: any;
  isArray?: boolean;
}
/**
 * Configuration option after internal processing
 */
export declare interface ProcessedApplicationOption extends ApplicationOption {
  value?: any;
  skipNext: boolean;
}
/**
 * An object generated by the `ApplicationOptions` class.
 */
export declare interface ApplicationOptionsConfig {
  settingsFile?: string;
  stateFile?: string;
  themesPath?: string;
  workspacePath?: string;
  dev?: boolean;
  debugLevel?: 'debug'|'error'|'info'|'silly'|'verbose'|'warn';
  withDevtools?: boolean;
  // this is for development purposes only
  port?: number;
  // the domain model file to open.
  open?: string;
  /**
   * When set it prohibits the application from auto update.
   */
  skipAppUpdate?: boolean;
  skipThemesUpdate?: boolean;
  userDataDir?: string;
  /**
   * Overrides current configuration for the release channel.
   */
  releaseChannel?: string;
  openProtocolFile?: string;
  /**
   * When set it does not render the cookie consent dialog
   */
  skipCookieConsent?: boolean;
  /**
   * When set it does not render the cookie consent dialog
   */
  skipDatabaseUpgrade?: boolean;
}

/**
 * When the application was opened from the protocol handler it will
 * have a path that looks like `domain://[source]/[action]/[id]`
 */
export declare interface ProtocolFile {
  source: string;
  action: string;
  id: string;
}

/**
 * The final config object distributed to all windows.
 */
export declare interface ApplicationConfig {
  /**
   * Whether the telemetry is enabled.
   */
  telemetry?: boolean;
  /**
   * Application release channel.
   */
  releaseChannel?: 'beta' | 'alpha' | 'latest';
  /**
   * Whether the automatic updates are enabled.
   * True by default.
   */
  autoUpdate?: boolean;
}

export declare interface WindowsSessionSchema {
  windows: WindowSession[];
}

/**
 * Interface describing a data structure for a window sizes and positions.
 * Used in `WindowPersistance`.
 */
export declare interface WindowSession {
  /**
   * The id of the window.
   */
  id?: number,
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export declare interface OpenPageOptions {
  /**
   * The name of the page in the `src/app/` directory to load in the window.
   * Default to `app.html`.
   */
  page?: string;
  /**
   * A string to be appended to the has part of the loaded URL.
   * No default value.
   */
  route?: string;
  /**
   * The name of the preload script located in the `src/preload/` folder.
   * When not set no preload script is loaded, unless loading the default page (no value on `page`),
   * then it is set to `arc-preload.js`.
   */
  preload?: string;
  /**
   * A list of init parameters to append to the loaded page's query string.
   */
  params?: {[key: string]: string};
  /**
   * The workspace file that has been requested to open with the window.
   * This is only for the main application window.
   */
  workspaceFile?: string;
  /**
   * When set it ignores reading window sizing and position from the workspace file.
   */
  ignoreWindowSessionSettings?: boolean;
  /**
   * When set it removed the default menu
   */
  noMenu?: boolean;
  /**
   * Optional size and position to set on the window.
   */
  sizing?: WindowSession;
  /**
   * This is intended to be used with the Google Drive window only. Google does not allow other than http: https: origins
   * and therefore the app is unable to make a request from the application.
   * When a Drive picker window is opened it instructs Electron to disable web security to work around this problem.
   */
  noWebSecurity?: boolean;
  /**
   * Makes the new window a child of the `parent`.
   */
  parent?: Electron.BrowserWindow;
}

export declare interface ArcAppInitOptions {
  /**
   * The backend id of the workspace file.
   */
  workspaceId?: string;
}


export interface SessionManagerConfig {
  /**
   * A list of application internal URLs for
   * which certificate error should not be ignored.
   */
  appUrls?: string[];
}

export interface ElectronCookieChangeRecord {
  /**
   * The cookie that was changed.
   */
  cookie: Cookie;
  /**
   * The cause of the change with one of the following values:
   * - `explicit` - The cookie was changed directly by a consumer's action.
   * - `overwrite` - The cookie was automatically removed due to an insert operation that overwrote it.
   * - `expired` - The cookie was automatically removed as it expired.
   * - `evicted` - The cookie was automatically evicted during garbage collection.
   * - `expired-overwrite` - The cookie was overwritten with an already-expired expiration date.
   */
  cause: string;
  /**
   * `true` if the cookie was removed, `false` otherwise.
   */
  removed: boolean;
}


export interface DriveExportInit {
  /**
   * Default mime type for a file if not defined when updating.
   */
  mime?: string;
  fileDescription?: string;
  fileType?: string;
}

export interface SaveDriveFileOptions {
  /**
   * Optional name of the parent folder
   */
  parent?: string;
  /**
   * Google Drive file id to update. Used when updating a file.
   */
  id?: string;
  /**
   * Google Drive file resource values. See Google Drive API documentation for details.
   */
  meta?: FileResource;
  /**
   * Authorization configuration to use when authorizing the request.
   * If the `accessToken` property is set it skips authorization and uses this token instead.
   * By default it expects `oauth2` configuration in the `package.json` file.
   */
  auth?: OAuth2Authorization;
}

export declare interface FileMedia {
  mimeType: string;
  body: string;
}

export declare interface FileResource {
  description?: string;
  parents?: string[];
  /**
   * The name of the file
   */
  name: string;
  /**
   * File content type. Defaults to `application/json`
   */
  mimeType?: string;
}

export declare interface AppFolderListResponse {
  kind: 'drive#fileList';
  incompleteSearch: boolean;
  files: FolderListItem[];
}

export declare interface FolderListItem {
  kind: 'drive#file';
  id: string;
  name: string;
  mimeType: string;
}

export declare interface FileCreateItem {
  kind: 'drive#file',
  id: string;
  name: string;
  mimeType: string;
  parents?: FolderListItem[];
}

export declare interface SystemThemeInfo {
  shouldUseDarkColors: boolean;
  shouldUseHighContrastColors: boolean;
  shouldUseInvertedColorScheme: boolean;
}
