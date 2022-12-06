// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //WS_URL: "https://192.168.0.118:8070/dvagreement.asmx",
  WS_URL: "http://192.168.0.123:5000/fastapi",
  PUSH_URL: "http://192.168.0.123:4000/notification",
  //WS_URL: "http://dvservices.somee.com/dvagreement.asmx",
  //WS_CLIENT_URL: "https://192.168.0.118:4443/DvClientServices.asmx",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
