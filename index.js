var request = require('superagent');
var _ = require('underscore');

var Identica = function(options) {
  this.options = options;
};

/**
 * options:
 *   voxeo_id
 */
Identica.prototype.voxeoAuthenticate = function(options, cb) {
  // Check if some parameters are missing
  var x =  _.all(['voxeo_id'], function(i) {
    return _.include(_.keys(options), i);
  });

  if (!x) {
    return cb("Missing parameters", null);
  }

  return request
    .post(this.options.url + '/voxeo_authenticate')
    .type('form')
    .send(options)
    .end(function(err, resp) {
      if (err) return cb("Failed to connect", null);
      if (resp.statusCode === 200) return cb(null, {
        statusCode: resp.statusCode,
        body: resp.body
      });
      return cb("Failed to authenticate", null);
    });
};

/**
 * options:
 *   access_token
 *   *subscriber_number
 *   sender_address
 *   scope
 */
Identica.prototype.authenticate = function(options, cb) {
  // Check if some parameters are missing
  var x =  _.all(['subscriber_number'], function(i) {
    return _.include(_.keys(options), i);
  });

  if (!x) {
    return cb("Missing parameters", null);
  }

  return request
    .post(this.options.url + '/authenticate')
    .type('form')
    .send(options)
    .end(function(err, resp) {
      if (err) return cb("Failed to connect", null);
      if (resp.statusCode === 200) return cb(null, {
        statusCode: resp.statusCode,
        body: resp.body
      });
      return cb("Failed to authenticate", null);
    });
};

module.exports = Identica;
