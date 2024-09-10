// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_URL: require('../assets/json/WebConfig.json').BASE_URL ,
  BASE_API: require('../assets/json/WebConfig.json').BASE_API,  
  APP_ID: require('../assets/json/WebConfig.json').APP_ID,
  // BASE_URL: 'http://apps.cnsvietnam.com.vn/demo',
  // BASE_API: 'http://apps.cnsvietnam.com.vn/demo/api',
  // APP_ID: 'bc989378a62549e9a918df74b59d3f36'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
