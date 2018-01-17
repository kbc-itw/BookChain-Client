// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
};
export const PORT_NUMBER = 3000;
export const API_PORT_NUMBER = 3000;
export const API_BASE_URL = 'http://localhost:' + API_PORT_NUMBER + '/';
export const WEBSOCKET_BASE_URL = 'ws://localhost:' + API_PORT_NUMBER + '/';
