/**
 * @module auth-svc
 * @summary: Provides interfaces to change authentication state.
 *
 * @description:
 *
 * Author: justin
 * Created On: 2015-03-21.
 * @license Apache-2.0
 */

'use strict';
// stick an eventListener that listens for all kinds of events.
// when an event you want logged in the app monitor appears, broadcast to the monitor queue.

module.exports = function construct(config, $http, authSvc, logger) {
  var m = {};
  config = config ? config : {};
  config = _.defaults(config, {});

  var formulateHttpHeaders = function(opts) {
    opts = opts || {};
    var user = authSvc.currentUser();
    if (user && user.token) {
      opts.headers = {'Authorization': 'Bearer '+user.token}
    }
    return opts;
  };

  var successHandler = function(res) {
    return res.body;
  };
  var errorHandler = function(res) {
    if (res.status == 401) {
      return authSvc.reauthenticate();
    }
    return {
      details: res.data,
      status: res.status
    };
  };

  m.post = function(path, data, opts) {
    var opts = formulateHttpHeaders(opts);
    logger.debug('POST config:', path, data, opts);
    return $http.post(path, data, opts)
            .then(successHandler)
            .then(null, errorHandler);
  };

  m.get = function(path, opts) {
    var opts = formulateHttpHeaders(opts);
    logger.debug('GET config:', path, opts);
    return $http.get(path, opts)
      .then(successHandler)
      .then(null, errorHandler);
  };

  m.put = function(path, data, opts) {
    var opts = formulateHttpHeaders(opts);
    logger.debug('PUT headers:', opts);
    return $http.put(path, data, opts)
      .then(successHandler)
      .then(null, errorHandler);
  };

  return m;
};