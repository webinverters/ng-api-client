/**
 * @module index.js
 * @summary: Wires up the library.
 *
 * @description:
 *
 * Author: justin
 * Created On: 2015-03-21.
 * @license Apache-2.0
 */

angular.module('win.api-client',[])
  .service('apiClient', ['config', '$http', require('./src/api-client')])
;
